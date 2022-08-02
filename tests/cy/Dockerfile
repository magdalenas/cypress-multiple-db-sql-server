FROM cypress/base:16.14.2
RUN apt-get update; apt-get install curl -y

WORKDIR /app
RUN curl https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh > wait-for-it.sh
RUN chmod +x wait-for-it.sh

COPY *.json /app
COPY cypress.config.docker.js /app/cypress.config.js

RUN npm i