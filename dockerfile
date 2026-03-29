# Use official Node.js 20 image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json / package.json only
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code into container
COPY . .

# Build TypeScript to JS
RUN npm run build

# Expose the port your app uses
EXPOSE 5000

# Command to apply migrations and start app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]