https://www.youtube.com/watch?v=ySqesLjz6K0&t=4144s
https://github.com/codinginflow/nextjs-15-ai-resume-builder

docker run -d \
 --name res_ai_db \
 -e POSTGRES_USER=admin \
 -e POSTGRES_PASSWORD=password \
 -e POSTGRES_DB=res_ai_db \
 -v /home/blazehub/workspace/blazehub/projects/data:/var/lib/postgresql/data \
 -p 5432:5432 \
 postgres:15

kill $(lsof -t -i:3000)
