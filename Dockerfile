FROM node:16-alpine

WORKDIR /app

COPY . .
RUN yarn install && yarn run build
CMD ["yarn", "run", "start:prod"]