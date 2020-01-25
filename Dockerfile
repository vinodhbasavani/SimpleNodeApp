FROM node:10-jessie

LABEL MAINTAINER="Vinodh Kumar Basavani<vinodh2308@gmail.com>"

WORKDIR /app

ADD . .

RUN npm i

CMD node index.js
