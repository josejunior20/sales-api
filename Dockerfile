FROM node:20-alpine

WORKDIR /app

RUN mkdir -p /app

COPY package*.json ./
COPY . . 

RUN yarn cache clean && \
    rm -rf node_modules && \
    yarn install --frozen-lockfile

EXPOSE 3003

CMD ["yarn", "start:swc"]







