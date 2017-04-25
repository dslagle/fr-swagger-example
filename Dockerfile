FROM node:7.9-alpine

COPY . /app
WORKDIR /app

ENV NODE_ENV production
RUN npm install &>/dev/null

CMD ["node", "public/app.js"]