FROM node:16-alpine3.16
RUN apk update && apk add bash

WORKDIR /app

COPY ./wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x wait-for-it.sh

COPY *.json /app

RUN npm i