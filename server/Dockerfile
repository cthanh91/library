FROM node:12-alpine3.10

WORKDIR /app

COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn install

COPY ./ /app/

EXPOSE 3000
CMD sh ./bin/start.sh
