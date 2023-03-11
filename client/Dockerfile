FROM node:16-alpine

# To make Docker work with the React App
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]