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
