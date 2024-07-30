# Use an official Node runtime as a parent image
FROM node:20 as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Vite React app
RUN npm run build

# Use an Nginx image to serve the static files
# FROM nginx:alpine

# Copy the build output to the Nginx html directory
# COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 8080

# Command to run Nginx
CMD ["npx", "serve", "-s", "dist"]
