FROM node:22-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

EXPOSE 4011

CMD ["npm", "start"]


