#!/bin/sh
# Compress text files
for f in `find | grep -E "\.js$|\.json$|\.css$|\.html$|\.woff2$"`
do 
    gzip -9k "$f"
    brotli -k -Z "$f"
done

# Compress image files
for f in `find | grep -E "\.jp*g$|\.png$"`
do 
    cwebp -q 90 "$f" -o "$f.webp"
    avifenc "$f" "$f.avif"
done