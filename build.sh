#!/bin/sh
cd ../
mkdir -p output
if [ -d "./web-study-game" ] && [ "$(ls -A ./web-study-game)" ]; then
    cp -R ./web-study-game/* ./output
else
    echo "배포 실패: web-study-game 디렉토리가 비어있거나 존재하지 않습니다."
    exit 1 
fi