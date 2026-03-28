FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# ✅ Install only production deps
RUN npm install --omit=dev

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]