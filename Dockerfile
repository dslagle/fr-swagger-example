FROM node:7.9-alpine

COPY . /app
WORKDIR /app

RUN npm install

CMD ["node", "public/app.js"]