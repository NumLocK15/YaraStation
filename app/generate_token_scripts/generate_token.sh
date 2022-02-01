#!/bin/sh

cat /app/generate_token_scripts/create_agent_user.py | python /app/manage.py shell
python /app/manage.py drf_create_token agent_user > /app/generate_token_scripts/agent_token.txt