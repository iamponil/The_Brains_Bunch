FROM node:12

WORKDIR /usr/app


COPY package.json .

RUN npm i

COPY . .

EXPOSE 5000

CMD ["npm","start"]