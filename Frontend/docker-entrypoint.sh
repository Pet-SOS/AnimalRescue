#!/bin/sh
jq -n env > config.json
nginx -g "daemon off;"