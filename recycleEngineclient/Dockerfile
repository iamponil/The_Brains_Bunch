FROM node:14.16.1 as frontBuilt

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npx react-scripts build

FROM nginx 

COPY --from=frontBuilt /app/build /usr/share/nginx/html

# copy nginx config file
COPY nginx.conf /etc/nginx/nginx.conf



# start nginx server
CMD ["nginx", "-g", "daemon off;"]

