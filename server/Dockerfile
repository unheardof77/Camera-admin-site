FROM node:22 AS builder

WORKDIR /server

COPY package*.json ./
RUN npm install --force

COPY tsconfig.json ./
COPY . .

RUN npm run build

# Stage 2: Run the app
FROM node:22

WORKDIR /server

COPY package*.json ./
RUN npm install --force

COPY --from=builder /server/build ./build

RUN mkdir -p /server/build/tempDownloads

EXPOSE 4000
CMD ["node", "build/server.js"]
