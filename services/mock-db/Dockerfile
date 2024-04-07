FROM node:lts

RUN apt-get update

ENV PORT 4000
EXPOSE 4000

WORKDIR /usr/src
ADD . .

RUN yarn install
CMD node src