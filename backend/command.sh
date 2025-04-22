#!/bin/bash

# Create init directory if it doesn't exist
mkdir -p init

# Check if the init SQL file exists, if not, create it
if [ ! -f "init/01-create-user.sql" ]; then
    cat > init/01-create-user.sql << 'EOF'
-- Create user 'fms' with password 'fmspassword'
CREATE USER 'fms'@'%' IDENTIFIED BY 'fmspassword';

-- Grant all privileges on all databases to the user
GRANT ALL PRIVILEGES ON *.* TO 'fms'@'%';

-- Grant specific privileges on the fmsdb database
GRANT ALL PRIVILEGES ON `fmsdb`.* TO 'fms'@'%';

-- Create a dedicated 'fms' database in addition to fmsdb
CREATE DATABASE IF NOT EXISTS `fms`;

-- Grant specific privileges on the fms database
GRANT ALL PRIVILEGES ON `fms`.* TO 'fms'@'%';

-- Apply the privileges
FLUSH PRIVILEGES;
EOF
fi

# Check if docker-compose.yml exists, if not, create it
if [ ! -f "docker-compose.yml" ]; then
    cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql_db
    restart: always
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: fmsdb
      TZ: UTC
    volumes:
      - mysql_data:/var/lib/mysql
      - ./init:/docker-entrypoint-initdb.d
      - ./db_dump:/db_dump
    command: --default-authentication-plugin=mysql_native_password

volumes:
  mysql_data:
EOF
fi

# Make the script executable
chmod +x init/01-create-user.sql

# Start the MySQL container using docker-compose
echo "Starting MySQL container..."
docker-compose up -d

# Wait for MySQL to be fully initialized
echo "Waiting for MySQL to initialize..."
sleep 30

# Check if MySQL is running
if docker-compose ps | grep -q "mysql_db.*Up"; then
    echo "MySQL server is running successfully!"
    
    # Check if dump file exists in the expected location
    DUMP_FILE="./db_dump/fms_2023-07-31.sql"
    if [ -f "$DUMP_FILE" ]; then
        echo "Found dump file: $DUMP_FILE"
        
        # Ensure the fms database exists
        docker exec mysql_db mysql -uroot -prootpassword -e "CREATE DATABASE IF NOT EXISTS fms;"
        
        # Import the dump file using cat to pipe the file content
        echo "Importing dump file into 'fms' database..."
        cat "$DUMP_FILE" | docker exec -i mysql_db mysql -uroot -prootpassword fms
        
        if [ $? -eq 0 ]; then
            echo "Database import completed successfully!"
        else
            echo "Error occurred during import. Checking file access..."
            # Display file permissions for debugging
            ls -la "$DUMP_FILE"
            echo "Trying alternative import method..."
            
            # Try an alternative approach by copying the file to a temporary location in the container
            docker cp "$DUMP_FILE" mysql_db:/tmp/dump.sql
            docker exec mysql_db mysql -uroot -prootpassword fms < /tmp/dump.sql
            
            if [ $? -eq 0 ]; then
                echo "Database import completed successfully with alternative method!"
            else
                echo "Error: Failed to import the dump file using both methods."
                echo "Check logs with: docker-compose logs mysql"
            fi
        fi
    else
        echo "Error: Dump file not found at $DUMP_FILE"
        echo "Please ensure your dump file is placed in the ./db_dump directory."
    fi
    
    echo "Connection details:"
    echo "  Host: localhost"
    echo "  Port: 3306"
    echo "  User: fms"
    echo "  Password: fmspassword"
    echo "  Databases: fmsdb, fms (with imported data)"
else
    echo "Error: MySQL server failed to start properly."
    echo "Check logs with: docker-compose logs mysql"
fi