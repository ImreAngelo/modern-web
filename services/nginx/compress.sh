#!/bin/sh
# Compress text files with gzip and brotli
for f in `find | grep -E "\.js$|\.json$|\.css$|\.html$|\.woff2$|\.txt$|\.svg$"`
do 
    echo "Compressing text: $f"
    gzip -9k "$f"
    brotli -k -Z "$f"
done

# Compress image files as webp and avif
for f in `find | grep -E "\.jpe?g$|\.png$"`
do 
    echo "Compressing image: $f"
    cwebp -q 90 "$f" -o "$f.webp"
    avifenc "$f" "$f.avif"
done