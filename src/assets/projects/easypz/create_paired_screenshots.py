#!/usr/bin/env python3
"""
Create paired light/dark mode screenshots with beautiful backgrounds
for the EasyPZ app showcase.
"""

import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import numpy as np

def create_gradient_background(width, height, color1='#e3f2fd', color2='#1976d2'):
    """Create a diagonal gradient background"""
    # Convert hex to RGB
    c1 = tuple(int(color1[i:i+2], 16) for i in (1, 3, 5))
    c2 = tuple(int(color2[i:i+2], 16) for i in (1, 3, 5))
    
    # Create gradient
    base = Image.new('RGB', (width, height), c1)
    top = Image.new('RGB', (width, height), c2)
    mask = Image.new('L', (width, height))
    mask_data = []
    
    for y in range(height):
        for x in range(width):
            # Diagonal gradient
            mask_data.append(int(255 * (x + y) / (width + height)))
    
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    
    # Add subtle blur for smoother gradient
    base = base.filter(ImageFilter.GaussianBlur(radius=5))
    
    return base

def add_drop_shadow(image, offset=(0, 15), blur=25, opacity=0.35):
    """Add a drop shadow to an image with proper alpha handling"""
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # Create a larger canvas for the shadow
    total_width = image.width + abs(offset[0]) + blur * 4
    total_height = image.height + abs(offset[1]) + blur * 4
    
    # Create final composite image
    final = Image.new('RGBA', (total_width, total_height), (0, 0, 0, 0))
    
    # Extract alpha channel and threshold it to remove semi-transparent pixels
    _, _, _, alpha = image.split()
    # Create a clean alpha mask by thresholding - this removes antialiasing artifacts
    alpha_array = np.array(alpha)
    # Only keep pixels that are reasonably opaque
    clean_alpha = np.where(alpha_array > 10, alpha_array, 0)
    alpha_clean = Image.fromarray(clean_alpha.astype('uint8'))
    
    # Create shadow from the cleaned alpha
    shadow_layer = Image.new('L', (total_width, total_height), 0)
    shadow_layer.paste(alpha_clean, (blur * 2 + offset[0], blur * 2 + offset[1]))
    
    # Apply multiple blur passes for smoother shadow
    for _ in range(3):
        shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius=blur // 3))
    
    # Apply opacity
    shadow_layer = shadow_layer.point(lambda x: int(x * opacity))
    
    # Create black shadow with this alpha
    shadow = Image.new('RGBA', (total_width, total_height), (0, 0, 0, 0))
    shadow.putalpha(shadow_layer)
    
    # Paste shadow first
    final.alpha_composite(shadow, (0, 0))
    
    # Paste original image on top
    final.alpha_composite(image, (blur * 2, blur * 2))
    
    return final

def create_paired_screenshot(light_path, dark_path, output_path, pair_num):
    """Create a paired screenshot with light and dark modes side by side"""
    
    # Load images
    light_img = Image.open(light_path).convert('RGBA')
    dark_img = Image.open(dark_path).convert('RGBA')
    
    # Calculate dimensions
    target_height = 900  # Height for each phone
    light_ratio = target_height / light_img.height
    dark_ratio = target_height / dark_img.height
    
    light_img = light_img.resize(
        (int(light_img.width * light_ratio), target_height), 
        Image.Resampling.LANCZOS
    )
    dark_img = dark_img.resize(
        (int(dark_img.width * dark_ratio), target_height), 
        Image.Resampling.LANCZOS
    )
    
    # Create canvas
    canvas_width = 2400
    canvas_height = 1200
    
    # Create gradient background
    background = create_gradient_background(canvas_width, canvas_height)
    
    # Add subtle pattern overlay
    overlay = Image.new('RGBA', (canvas_width, canvas_height), (255, 255, 255, 8))
    background = Image.alpha_composite(background.convert('RGBA'), overlay).convert('RGB')
    
    # Convert to RGBA for compositing
    canvas = background.convert('RGBA')
    
    # Add shadows to phones
    blur = 25
    light_shadow = add_drop_shadow(light_img, blur=blur)
    dark_shadow = add_drop_shadow(dark_img, blur=blur)
    
    # Calculate positions (centered with gap)
    gap = 200
    total_width = light_img.width + dark_img.width + gap
    start_x = (canvas_width - total_width) // 2
    y_position = (canvas_height - target_height) // 2 - 50  # Slightly above center
    
    # Paste images with proper alpha compositing
    # Adjust positions to account for shadow padding
    shadow_offset = blur * 2  # padding from add_drop_shadow function
    canvas.alpha_composite(light_shadow, 
                         (start_x - shadow_offset, y_position - shadow_offset))
    canvas.alpha_composite(dark_shadow, 
                         (start_x + light_img.width + gap - shadow_offset, y_position - shadow_offset))
    
    # Add labels
    draw = ImageDraw.Draw(canvas)
    
    # Try to use a nice font, fallback to default if not available
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 42)
    except:
        font = ImageFont.load_default()
    
    # Add text labels with subtle shadow
    label_y = y_position + target_height + 60
    
    # Light mode label
    light_label_x = start_x + light_img.width // 2
    # Shadow
    draw.text((light_label_x + 2, label_y + 2), "Light Mode", 
             font=font, fill=(0, 0, 0, 80), anchor="mm")
    # Text
    draw.text((light_label_x, label_y), "Light Mode", 
             font=font, fill=(255, 255, 255, 255), anchor="mm")
    
    # Dark mode label
    dark_label_x = start_x + light_img.width + gap + dark_img.width // 2
    # Shadow
    draw.text((dark_label_x + 2, label_y + 2), "Dark Mode", 
             font=font, fill=(0, 0, 0, 80), anchor="mm")
    # Text
    draw.text((dark_label_x, label_y), "Dark Mode", 
             font=font, fill=(255, 255, 255, 255), anchor="mm")
    
    # Add screen number in corner
    draw.text((50, 50), f"Screen {pair_num + 1}", 
             font=font, fill=(255, 255, 255, 180))
    
    # Save
    canvas = canvas.convert('RGB')
    canvas.save(output_path, 'PNG', quality=95, optimize=True)
    print(f"Created: {output_path}")

def create_showcase_grid(paired_images, output_path):
    """Create a grid showcase of all paired images"""
    # Load all images
    images = [Image.open(img) for img in paired_images]
    
    # Create grid (2x4)
    thumb_width = 600
    thumb_height = 300
    padding = 30
    
    grid_width = 2 * thumb_width + 3 * padding
    grid_height = 4 * thumb_height + 5 * padding
    
    # Create white background
    showcase = Image.new('RGB', (grid_width, grid_height), '#f5f5f5')
    
    # Place images
    for i, img in enumerate(images[:8]):
        # Create thumbnail
        thumb = img.resize((thumb_width, thumb_height), Image.Resampling.LANCZOS)
        
        # Calculate position
        row = i // 2
        col = i % 2
        x = padding + col * (thumb_width + padding)
        y = padding + row * (thumb_height + padding)
        
        # Add subtle shadow to thumbnail
        shadow_img = Image.new('RGBA', (thumb_width + 10, thumb_height + 10), (0, 0, 0, 0))
        shadow_draw = ImageDraw.Draw(shadow_img)
        shadow_draw.rectangle([5, 5, thumb_width + 5, thumb_height + 5], fill=(0, 0, 0, 40))
        shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=5))
        
        showcase.paste(shadow_img, (x - 5, y - 5), shadow_img)
        showcase.paste(thumb, (x, y))
    
    showcase.save(output_path, 'PNG', quality=95, optimize=True)
    print(f"Created showcase: {output_path}")

def main():
    # Create output directory
    os.makedirs('paired', exist_ok=True)
    
    paired_images = []
    
    # Process each pair
    for i in range(8):
        light_file = f"easypz-screens-{i}.png"
        dark_file = f"easypz-screens-{i + 8}.png"
        output_file = f"paired/easypz-screens-pair-{i}.png"
        
        if os.path.exists(light_file) and os.path.exists(dark_file):
            create_paired_screenshot(light_file, dark_file, output_file, i)
            paired_images.append(output_file)
        else:
            print(f"Warning: Missing files for pair {i}")
    
    # Create showcase grid
    if paired_images:
        create_showcase_grid(paired_images, 'paired/easypz-screens-showcase.png')
    
    print(f"\nDone! Created {len(paired_images)} paired images.")
    print("You can use these images individually or the showcase grid.")

if __name__ == "__main__":
    main()