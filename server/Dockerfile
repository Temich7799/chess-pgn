# Use the official Node.js image as base image
FROM node:20.5.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the server will run on
EXPOSE 5000

# # Set environment variables for MySQL connection
# ENV MYSQL_HOST=localhost
# ENV MYSQL_USER=root
# ENV MYSQL_PASSWORD=
# ENV MYSQL_DATABASE=search_clients_ilya

# Start the Express server
CMD ["node", "index.js"]