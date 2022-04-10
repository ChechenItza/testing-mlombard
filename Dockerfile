FROM node:lts-alpine3.14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE ${PORT}

CMD ["node", "./src/server.js"]