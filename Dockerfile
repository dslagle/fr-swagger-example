FROM node:7.9-alpine

COPY . /app
WORKDIR /app

RUN npm install &>/dev/null

CMD ["node", "public/app.js"]