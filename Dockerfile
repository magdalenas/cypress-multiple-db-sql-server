FROM cypress/base:16.14.2

WORKDIR /app

COPY ./wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x wait-for-it.sh

COPY *.json /app
# COPY ../src src
# COPY ./jest tests/jest
# COPY ../tsconfig.json ./

RUN npm i

# RUN npm run test
# CMD ["npm", "run", "test"]