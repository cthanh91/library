FROM node:12-alpine3.10

WORKDIR /app

COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn install

COPY ./ /app/
RUN yarn build
RUN yarn global add serve

EXPOSE 5000
CMD serve -s build
