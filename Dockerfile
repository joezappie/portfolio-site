# syntax=docker/dockerfile:1.2
ARG APP_PATH=/usr/app

#
# ---- Build ----
FROM node:16-slim AS build
ARG APP_PATH
WORKDIR $APP_PATH
COPY package*.json ./


RUN npm set progress=false && npm config set depth 0
RUN npm i

COPY ./ ./
RUN npm run build

#
# --- Release ----
FROM nginx:alpine as release
ARG APP_PATH
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build $APP_PATH/dist ./

COPY .nginx/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]