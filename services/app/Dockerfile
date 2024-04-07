# ========================
# Build web app
# ========================
FROM node:lts AS build
ARG PUBLIC_PATH=static

RUN apt-get update
RUN apt-get install -y webp brotli

# Build app
WORKDIR /usr/src
ADD . .
RUN yarn install
RUN yarn next telemetry disable
RUN yarn build

# Get build artifacts for SSR
WORKDIR /usr/app
RUN mv /usr/src/build/standalone target

# Get static build artifacts for nginx
WORKDIR /usr/app
RUN mv /usr/src/build/static static
RUN mv /usr/src/public/* static

# # TODO: remove _next from requests + prerender routes
# RUN sed -i "s/standalone/export/" next.config.mjs
# RUN yarn build

# WORKDIR /usr/app/build
# RUN mv _next/static ${PUBLIC_PATH}
# RUN rm -r _next
# RUN sed -i "s/_next\/static/$PUBLIC_PATH/g" *.* ${PUBLIC_PATH}/**/*.*



# ========================
# Server-Side Rendering
# ========================
FROM node:lts AS ssr

WORKDIR /usr/app
COPY --from=build /usr/app/target .
# Static files are served from CDN or nginx
COPY --from=build /usr/app/static public

EXPOSE 3000
ENV PORT 3000

CMD node server.js
# CMD tail -f /dev/null