FROM node:alpine

RUN mkdir -p /usr/src/app

ENV PORT 3000

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

EXPOSE 3000

ENTRYPOINT ["npm", "run"]