FROM node:18 AS base

WORKDIR /home/app

FROM base AS deps

COPY package.json .
COPY yarn.lock .
COPY server/package.json ./server/package.json
COPY client/package.json ./client/package.json

RUN yarn