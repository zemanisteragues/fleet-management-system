FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY . .

# Create a health check endpoint if needed
RUN if ! grep -q "/api/health" server.js; then \
      echo 'app.get("/api/health", (req, res) => { res.status(200).json({ status: "ok" }); });' >> server.js; \
    fi

# Expose API port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]