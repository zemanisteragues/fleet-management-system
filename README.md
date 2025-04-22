# Web App Deployment Documentation

This documentation provides a step-by-step guide on how to deploy a web application built with React, MySQL, Node.js, and Express on DigitalOcean. The deployment process involves renting a virtual machine, installing necessary software, cloning the GitHub repository, and setting up the database using a MySQL dump file. Let's begin!

## Prerequisites

Before starting the deployment process, make sure you have the following prerequisites:

- A DigitalOcean account
- Basic knowledge of command-line interface (CLI)
- Access to the GitHub repository of the web application
- MySQL dump file for the database

## Step 1: Rent a Virtual Machine on DigitalOcean

1. Log in to your DigitalOcean account.
2. Click on "Create" and select "Droplets" from the dropdown menu.
3. Choose a configuration for your virtual machine, such as the desired operating system, CPU, memory, and storage.
4. Select a data center region close to your target audience.
5. Under "Authentication," choose an SSH key or enter a root password to access your virtual machine.
6. Optionally, add any additional settings as per your requirements.
7. Click on "Create Droplet" to rent the virtual machine.

## Step 2: Connect to the Virtual Machine

1. Once the virtual machine is created, note down the IP address of the machine.
2. Open your preferred terminal or SSH client.
3. Connect to the virtual machine using SSH. For example:

```bash
ssh root@<your-droplet-ip>
```

## Step 3: Install Software Dependencies

1. Update the package lists on the virtual machine by running the following commands:

```bash
apt-get update
apt-get upgrade
```

2. Install Node.js, MySQL, Git, and npm by running the following command:

```bash
apt-get install nodejs mysql-server git npm -y
```

## Step 4: Clone the GitHub Repository

1. Change to the desired directory on your virtual machine where you want to clone the repository.
2. Clone the GitHub repository using the following command:

```bash
git clone <repository-url>
```

## Step 5: Install Backend and Frontend Dependencies

1. Change to the root directory of the cloned repository.
2. Install the backend dependencies by navigating to the backend folder and running:

```bash
cd backend
npm install
```

3. Install the frontend dependencies by navigating to the frontend folder and running:

```bash
cd ..
cd client
npm install
```

## Step 6: Set Up the Database

1. Navigate to the root directory of the cloned repository.
2. Create the database by importing the MySQL dump file using the following command:

```bash
mysql -u root -p fms < /path/to/dump/file.sql
```

Note: Replace `/path/to/dump/file.sql` with the actual location of your MySQL dump file.

## Step 7: Configure Environment Variables

1. In the root directory of the cloned repository, create a `.env` file.
2. Open the `.env` file and add the necessary environment variables such as database connection details, API keys, and other configurations.

Example `.env` file:

```plaintext
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_NAME=fms
JWT_SECRET_KEY=your_secret_key
```

## Step 8: Start the Application

1. Change to the root directory of the cloned repository.
2. Start the backend server by navigating to the backend folder and running:

```bash
npm start
```

3. Start the frontend application by navigating to the frontend folder and running:

```bash
npm start
```

## Step 9: Access the Deployed Web App

1. Open a web browser and past the IP address from your droplet
