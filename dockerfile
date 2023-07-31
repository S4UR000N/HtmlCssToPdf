FROM node:18.16.1
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci --omit=dev
EXPOSE ${PROD_PORT}
CMD ["node", "index.js"]