#!/bin/bash

../docker-entrypoint.sh rabbitmq-server &
PID=$!
sleep 5

echo "rabbit_secret" > /var/lib/rabbitmq/.erlang.cookie

rabbitmqctl stop_app
rabbitmqctl join_cluster rabbit@rabbit1
rabbitmqctl start_app

wait $PID