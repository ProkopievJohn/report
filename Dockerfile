FROM node:9
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock
RUN npm i -g yarn
RUN cd /app && yarn install

WORKDIR /app
ADD . /app
