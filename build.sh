#!/bin/sh
cd ../
echo "📌 현재 디렉토리: $(pwd)"  # 현재 경로 출력
ls -la  # 현재 디렉토리의 모든 파일 출력

mkdir -p output
if [ -d "./web-study-game" ]; then
    echo "📂 web-study-game 디렉토리 존재함"
else
    echo "❌ web-study-game 디렉토리가 존재하지 않습니다."
fi

if [ "$(ls -A ./web-study-game 2>/dev/null)" ]; then
    echo "✅ web-study-game 내부에 파일이 있음"
    cp -R ./web-study-game/* ./output
else
    echo "⚠️ 배포 실패: web-study-game 디렉토리가 비어있거나 존재하지 않습니다."
    exit 1 
fi