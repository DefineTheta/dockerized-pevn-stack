docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

cd client/
npm run build