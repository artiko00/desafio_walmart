FROM node:current-alpine3.10 as build-stage
ENV ENVIRONMENT=production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# etapa de producción
FROM nginx:1.19.1 as production-stage
ENV ENVIRONMENT=production
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'