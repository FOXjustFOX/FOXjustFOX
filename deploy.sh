#! /bin/bash

cd /home/fox/256gb_drive/server/apps/FOXjustFOX
git pull origin main
docker-compose down
docker-compose up -d --build

#echo "hello"
