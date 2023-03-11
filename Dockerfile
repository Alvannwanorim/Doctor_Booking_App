FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./dist ./dist/
COPY .env .
COPY package*.json ./

RUN npm install

CMD ["node", "dist/main.js"]