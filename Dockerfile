FROM node:7.9-alpine

COPY . /app
WORKDIR /app

ENV NODE_ENV production
RUN npm install &>/dev/null

ENV REDIS_HOST redis
ENV REDIS_PORT 6379

CMD ["node", "public/app.js"]