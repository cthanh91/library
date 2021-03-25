FROM node:12-alpine3.10

ARG API_BASE_URL

WORKDIR /app

COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn install

COPY ./ /app/
ENV API_BASE_URL=$API_BASE_URL
RUN yarn build
RUN yarn global add serve

EXPOSE 5000
CMD serve -s build
