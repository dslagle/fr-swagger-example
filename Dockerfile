FROM rabbitmq:3.6.9

COPY ./entry.sh entry.sh

CMD entry.sh