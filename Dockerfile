
FROM node:14-alpine

WORKDIR /home/node

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]
