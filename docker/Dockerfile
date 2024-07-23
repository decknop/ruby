# Use the base image of Node.js version 14
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Install git (if not included in the base image)
RUN apt-get update && apt-get install -y git && npm init -y

# Clone your repository from GitHub using HTTPS
RUN git clone https://github.com/ValdesOMiguel/discord.git /app/repo/

# Switch to the cloned working directory
WORKDIR /app

RUN cp -r repo/ruby/* . && rm -rf repo/

# Copy package.json and package-lock.json (if exists)
# COPY package*.json ./

# Install project dependencies
RUN npm install

# Expose port 3000 in the container (if needed)
EXPOSE 3000

# Default command to run the application when the container starts
CMD ["node index.js"]
