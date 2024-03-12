# Use the official Node.js image as base image for building React app
FROM node:20.5.0 as build

# Set the working directory inside the container
WORKDIR /client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use a smaller, lightweight image for serving the built React app
FROM nginx:alpine

# Copy the built app from the previous stage to the nginx html directory
COPY --from=build /client/build /usr/share/nginx/html

# Expose port 80 to access the React app
EXPOSE 80

# Start nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]