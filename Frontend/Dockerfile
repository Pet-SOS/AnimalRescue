# define build container
FROM node:12 as react-build

# copy the contents of agent working directory on host to workdir in container
WORKDIR /app
ADD . .

# install and cache app dependencies
RUN yarn
RUN yarn build

# Second stage - Build runtime image
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]