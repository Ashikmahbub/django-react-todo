FROM node:18

# Set work directory
WORKDIR /app

# Install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy frontend code
COPY frontend/ .

# Build frontend
RUN npm run build

# Serve frontend build with a simple static server
RUN npm install -g serve
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
