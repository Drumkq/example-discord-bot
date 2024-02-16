FROM node:latest
LABEL authors="drumkq"
MAINTAINER "drumkq https://github.com/drumkq"

WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "npm", "run", "start:dev" ]