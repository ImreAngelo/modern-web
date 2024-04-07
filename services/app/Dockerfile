# ========================
# Build web app
# ========================
FROM node:lts AS build
ARG PUBLIC_PATH=public

RUN apt-get update
RUN apt-get install -y brotli libavif-bin webp

# Build app
WORKDIR /usr/src
ADD . .
RUN yarn install --immutable
RUN yarn next telemetry disable
RUN yarn build

# Get build artifacts for SSR
WORKDIR /usr/app
RUN mv /usr/src/build/standalone target

# Get static build artifacts for nginx
WORKDIR /usr/app
RUN mv /usr/src/build/static ${PUBLIC_PATH}
RUN mv /usr/src/public/* ${PUBLIC_PATH}

# # TODO: remove _next from requests and prerender static routes
# RUN sed -i "s/standalone/export/" next.config.mjs
# RUN yarn build

# WORKDIR /usr/app/build
# RUN mv _next/static ${PUBLIC_PATH}
# RUN rm -r _next
# RUN sed -i "s/_next\/static/$PUBLIC_PATH/g" *.* ${PUBLIC_PATH}/**/*.*

# Compress files
WORKDIR /usr/app/${PUBLIC_PATH}
RUN /usr/src/compress.sh



# ========================
# Server-Side Rendering
# ========================
FROM node:lts AS ssr
ARG PUBLIC_PATH=public

WORKDIR /usr/app
COPY --from=build /usr/app/target .
# Static files are served from CDN or nginx
COPY --from=build /usr/app/${PUBLIC_PATH} public

EXPOSE 3000
ENV PORT 3000

# Settings that differ from non-docker build
ENV POST_API http://post:4000/v1

CMD node server.js
# CMD tail -f /dev/null