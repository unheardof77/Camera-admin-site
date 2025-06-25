FROM node:22

WORKDIR /client

COPY package*.json ./
RUN npm install --force

COPY . .

RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]