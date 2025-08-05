# 1. Base image
FROM node:20-alpine

# 2. Working directory
WORKDIR /app

# 3. Copy only package files first (to use Docker cache)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy all source code
COPY . .

# 6. Expose port
EXPOSE 3000

# 7. Start the app
CMD [ "npm", "run", "dev" ]
