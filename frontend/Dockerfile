FROM    ubuntu:16.04

RUN apt-get update
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN apt-get install curl -y
RUN npm install -g n
RUN n 7.8.0

WORKDIR    /app
COPY    . /app

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN cnpm install
RUN npm run prod

RUN apt-get install nginx -y

COPY ./nginx/nginx.conf /etc/nginx/

CMD ["nginx", "-g", "daemon off;"]

