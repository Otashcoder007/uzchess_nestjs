FROM node:25-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:25-alpine

WORKDIR /app

COPY pacakge.json ./

RUN npm install --omit=dev



RUN npm install pm2

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main.js"]