# ========================
# Build web app
# ========================
FROM node:lts AS build
ARG PUBLIC_PATH=static

RUN apt-get update
RUN apt-get install -y webp brotli

# Build app
WORKDIR /usr/app
ADD . .
RUN yarn install
RUN yarn prebuild
RUN yarn build



# # Remove '_next/static' from requests
# WORKDIR /usr/app/build/
# RUN mv _next/static ${PUBLIC_PATH}
# RUN rm -r _next
# RUN sed -i "s/_next\/static/$PUBLIC_PATH/g" *.* ${PUBLIC_PATH}/**/*.*

# # Compress files
# RUN gzip -9k -r ./
# RUN brotli -k -Z *.* \
#     ${PUBLIC_PATH}/chunks/*.js \
#     ${PUBLIC_PATH}/chunks/pages/*.js \
#     ${PUBLIC_PATH}/css/*.css \
#     ${PUBLIC_PATH}/media/*.woff2 
# RUN rm *.gz.br
# TODO: Compress all files in subdirectories automatically
# RUN for d in ./*/ ; do (cd ./$d && brotli -k -Z *.* && rm *.gz.br) ; done

# WORKDIR /usr/app/build/${PUBLIC_PATH}/media
# RUN for f in *.* ; do (cwebp -q 80 $f -o $f.webp) ; done