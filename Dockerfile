FROM node:latest
WORKDIR /app
COPY package.json ./
COPY yarn.lock .
RUN yarn install --production
#RUN npm install 
COPY . .
RUN npm run build

FROM nginx:latest
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
#EXPOSE 3000
EXPOSE 80
#CMD ["npm", "start"]
CMD [ "nginx", "-g", "daemon off;" ]