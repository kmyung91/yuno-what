#!/bin/bash

# Create paired light/dark mode screenshots with nice backgrounds
# Requires ImageMagick

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is required but not installed."
    echo "Install it with: brew install imagemagick"
    exit 1
fi

# Create output directory
mkdir -p paired

# Loop through 0-7 (light mode screenshots)
for i in {0..7}; do
    light_file="easypz-screens-${i}.png"
    dark_file="easypz-screens-$((i + 8)).png"
    output_file="paired/easypz-screens-pair-${i}.png"
    
    echo "Processing pair ${i}: ${light_file} + ${dark_file}"
    
    # Create a gradient background with EasyPZ brand colors
    # Using a subtle gradient from light blue to darker blue
    convert -size 2400x1200 \
        -define gradient:angle=135 \
        gradient:'#e3f2fd'-'#1e88e5' \
        -blur 0x8 \
        temp_bg.png
    
    # Add a subtle pattern overlay for texture
    convert temp_bg.png \
        -fill white -colorize 5% \
        -attenuate 0.2 +noise Gaussian \
        -blur 0x0.5 \
        temp_bg_textured.png
    
    # Process light mode screenshot (left side)
    convert "${light_file}" \
        -resize 800x \
        \( +clone -background black -shadow 40x20+0+15 \) \
        +swap -background none -layers merge +repage \
        temp_light_shadow.png
    
    # Process dark mode screenshot (right side)
    convert "${dark_file}" \
        -resize 800x \
        \( +clone -background black -shadow 40x20+0+15 \) \
        +swap -background none -layers merge +repage \
        temp_dark_shadow.png
    
    # Composite everything together
    convert temp_bg_textured.png \
        temp_light_shadow.png -geometry +400+150 -composite \
        temp_dark_shadow.png -geometry +1200+150 -composite \
        -font Arial-Bold -pointsize 48 -fill white \
        -annotate +620+1050 "Light Mode" \
        -annotate +1420+1050 "Dark Mode" \
        -quality 95 \
        "${output_file}"
    
    # Clean up temporary files
    rm -f temp_*.png
done

# Create a combined showcase image with all pairs
echo "Creating combined showcase image..."
montage paired/easypz-screens-pair-*.png \
    -tile 2x4 \
    -geometry 1200x600+40+40 \
    -background '#f5f5f5' \
    -shadow \
    paired/easypz-screens-showcase.png

echo "Done! Created ${i} paired images in ./paired/"
echo "Showcase image: ./paired/easypz-screens-showcase.png"