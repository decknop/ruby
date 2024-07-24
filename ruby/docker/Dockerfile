# Use the base image of Node.js version 14
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Install git (if not included in the base image)
RUN apt-get update && apt-get install -y git vim && echo 'alias ll="ls -la"' >> ~/.bashrc

# Clone your repository from GitHub using HTTPS
RUN git clone https://github.com/DECKNOP/ruby.git /app/repo/

# Switch to the cloned working directory
WORKDIR /app

RUN cp -r repo/ruby/* . && rm -rf repo/

# Copy token
COPY config.json /app

# Install project dependencies
RUN npm install

# Expose port 3000 in the container (if needed)
EXPOSE 3000

# Default command to run the application when the container starts
CMD ["node", "index.js"]