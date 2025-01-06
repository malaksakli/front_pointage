FROM node:16.10.0 AS build

WORKDIR /app

COPY package*.json ./
COPY . .
RUN npm install -f
RUN npm run build
FROM nginx:1.21.1
COPY --from=build /app/dist/my-angular-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
