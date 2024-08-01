# Use official Node.js image as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Install git (if not already included in the node image)
RUN echo "Installing git..." && \
    apt-get update && \
    apt-get install -y git && \
    echo "Git installed successfully."

# Clone your repository
RUN echo "Cloning repository..." && \
    git clone https://github.com/lhtakshaykumar/LND-React-Suspense-TS . && \
    echo "Repository cloned successfully."

# List the folders present in /app after cloning
RUN echo "Listing contents of /app after cloning:" && \
    ls -al /app && \
    echo "Contents of /app listed."

# Set the working directory to the frontend directory
WORKDIR /app/LND-React-Suspense-TS/frontend

# Install dependencies for frontend
RUN echo "Installing frontend dependencies..." && \
    npm install && \
    echo "Frontend dependencies installed."

# Build the frontend (assuming React build)
RUN echo "Building the frontend..." && \
    npm run build && \
    echo "Frontend build completed."

# Set the working directory to the backend directory
WORKDIR /app/LND-React-Suspense-TS/backend

# Install dependencies for backend
RUN echo "Installing backend dependencies..." && \
    npm install && \
    echo "Backend dependencies installed."

# Expose ports (frontend: 5000, backend: 3000)
EXPOSE 5000
EXPOSE 3000

CMD ["npm", "start"]

# Command to start both services