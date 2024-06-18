# ========================
#  Build web app and compress static files
#  TODO: Compress static files in nginx build?
# ========================
FROM node:lts AS build

RUN apt-get update

# Build app
WORKDIR /usr/src
ADD package*.json .
ADD next.config.mjs .
RUN yarn install
RUN yarn next telemetry disable
ADD src src
RUN yarn build

# Get artifacts
WORKDIR /usr
RUN mv src/build/static app
RUN mv src/build/server/app/* app
RUN mv src/build/server/pages/*.html app
ADD public app

# ARG PUBLIC_PATH=static
# RUN mv ./src/compress.sh app
# WORKDIR /usr/app
# RUN ./compress.sh

# TODO: Include static HTML files
# TODO: Remove '_next/static' from requests

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


# =============================
#  Slim down image and use SSR
# =============================
FROM node:alpine AS standalone
ARG PRIVATE_PATH=/opt/site
ARG PUBLIC_PATH=/usr/app

WORKDIR ${PRIVATE_PATH}
COPY --from=build /usr/src/build/standalone ${PRIVATE_PATH}
COPY --from=build /usr/app ${PRIVATE_PATH}/build/static

# Nginx expects to find static files in /usr/app
RUN ln -s ${PRIVATE_PATH}/build/static /usr/app

# Run server
EXPOSE 3000
WORKDIR ${PRIVATE_PATH}
CMD node server.js