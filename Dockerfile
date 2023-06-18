
FROM node
WORKDIR /myapp
COPY ./package*.json ./
RUN npm install
COPY . .
CMD [ "node", "container_second.js" ]
