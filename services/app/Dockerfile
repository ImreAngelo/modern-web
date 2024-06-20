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