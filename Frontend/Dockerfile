# define build container
FROM node:12 as react-build

# copy the contents of agent working directory on host to workdir in container
WORKDIR /app
ADD . .

# install and cache app dependencies
RUN npm install
RUN npm run build

# Second stage - Build runtime image
FROM nginx:alpine
RUN apk add jq
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
COPY docker-entrypoint.sh .
EXPOSE 80
RUN ["chmod", "+x", "./docker-entrypoint.sh"]
CMD ["./docker-entrypoint.sh"]