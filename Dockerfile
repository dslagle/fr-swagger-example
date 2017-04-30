FROM node:7.9-slim

COPY . /app
WORKDIR /app

ENV NODE_ENV production
RUN npm install

ENV REDIS_HOST my-redis
ENV REDIS_PORT 6379

CMD ["node", "public/main.js"]