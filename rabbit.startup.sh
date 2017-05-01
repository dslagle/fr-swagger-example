#!/bin/bash
rabbitmqctl stop_app
rabbitmqctl join_cluster rabbit1
rabbitmqctl start_app