# Use the official Node.js 18 slim image as a base
FROM node:18-slim

# Set working directory in the container
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production && npm install -g @nestjs/cli

# Copy the source code to the container
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start:prod"]