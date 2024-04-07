#!/bin/sh
# Compress text files
for f in `find | grep -E "\.js$|\.json$|\.css$|\.html$|\.woff2$"`
do 
    gzip -9k "$f"
    brotli -k -Z "$f"
done

# Image files
# WebP
# Avif