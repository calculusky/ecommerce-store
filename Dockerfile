FROM node:lts-slim


WORKDIR /app

RUN npm install -g pnpm

COPY package.json .

RUN pnpm install

COPY . .

RUN pnpm prisma:generate

RUN pnpm db:migrate

RUN pnpm run build

CMD [ "node", "dist/index.js" ]