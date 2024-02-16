FROM node AS development
LABEL authors="drumkq"
MAINTAINER "drumkq https://github.com/drumkq"

WORKDIR ./src
COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .
EXPOSE 3000