FROM node:16

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli@9.5.0
RUN npm i webpack

USER node

WORKDIR /home/node/app