FROM rabbitmq:3.6.9

RUN mkdir /app
WORKDIR /app

COPY ./entry.sh entry.sh

CMD /app/entry.sh rabbitmq-server