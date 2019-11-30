# Core Idea

The objective of this project is to demonstrate Browser Fingerprinting. Browser Fingerprinting allows web services to track your interaction on a website.

The most recent interactions can be tied back to previous interactions. All of this can be done without login information or cookies.

# Live Demonstration

The website is live at [www.noescape.ga](www.noescape.ga)

# Setup Instructions

Incase anyone wants to try out the setup of the website themselves, the instructions can be found below. The process of setting up Mongo Express React Node cluster is derived from [here](https://medium.com/@rksmith369/how-to-deploy-mern-stack-app-on-aws-ec2-with-ssl-nginx-the-right-way-e76c1a8cd6c6)

# Pre-Requisites:

## Setup AWS-EC2 Instance

Make an account of AWS. Enter the credit/card details. No charges will be levied, but adding card information is a necessaary step.

Locate EC2 service, and click on it to enter EC2 Dashboard.

1. Select Launch Instance, in 'Choose AMI', Select Ubuntu Server 18.04 LTS, x86 version
2. Leave all default selections as is launch the instance. Please note that in its current configuration, any IP would be able to access the EC2 instance.
3. When the instance is launched, right click on the instance and select connect. Configure the SSH connection mechanish and download the .pem file
4. Note the public DNS as it will be important in the next setp

## Setup Account on MongoDB Atlas

1. An free-tier cluster needs to be setup on MongoDB Atlas service. The guide to setting it up can be found [here](https://docs.atlas.mongodb.com/getting-started/) or in video format [here](https://www.youtube.com/watch?v=rPqRyYJmx2g):

2. During the network whitelisting step, enter the EC2 Public IP. This means only the EC2 instance can access the Mongo DB database

3. When cluster is online, select 'Connect' and get the connection String. It should look something like this:

   ```
   mongodb+srv://pranavmrane:<password>@fingerprintingstorage-fsfmc.mongodb.net/test?retryWrites=true&w=majority
   ```

4. The password will for the cluster should be added in the connection string. This string will be used in a later step

# Setting up application in EC2:

Log in to EC2 using SSH or Putty

```
cd /var/www
sudo rm -rf Website_Fingerprinting
sudo git clone https://github.com/pranavmrane/Website_Fingerprinting.git
cd Website_Fingerprinting
sudo bash setupServer.sh
```

Installation is done. Some additional steps are required.

```
cd /var/www/Website_Fingerprinting/backend
sudo vim .env
```

Paste the connection string obtained from Mongo DB Atlas into this file. Save file pressing Esc. And then :wq

```
cd /var/www/Website_Fingerprinting
sudo npm run build
cd backend
sudo pm2 start server.js
sudo service nginx stop && sudo service nginx start
```

To stop the server, do the following:

```
sudo pm2 stop all
```

The website will now be available on the public ip of EC2.

Remember to close the instance of EC2 and cluster of Mongo DB when the experiment is done.

# Important File Locations

backend/routes/users.js: Contains Backend Code, processes data from front end
src/components/actionlist.component.js: Front End code, accept data and display response

<!--
## Linux Users

Start Terminal (Ctrl + Alt + T)

```
cd ~
git clone https://github.com/pranavmrane/Website_Fingerprinting.git
cd Website_Fingerprinting/
sudo bash setupEnvStartBackend.sh
```

Start New Terminal(Ctrl + Alt + T)

```
cd ~/Website_Fingerprinting
bash startFrontEnd.bash
```

This should install all system requirements and start the servers. To close the servers close the terminals.

For more details on starting servers separately checkout the section titled 'Run Instructions'.

## Non-Linux Users

The process needs npm, node and react installed on the machine. The instructions for installation are specified [here](https://nodejs.org/en/):

The project files must also be cloned in a folder.

Furthermore Additonal Packages are also required for the project to function.The instructions for installation are specified [here](https://www.tutorialsteacher.com/nodejs/what-is-node-package-manager)

## Backend Packages Required(Inside root/backend folder)

- nodemon(installed globally)
- install
- express
- cors
- mongoose
- dotenv
- hashcode

## FrontEnd Packages Required(Inside root folder)

- axios
- react-router-dom
- bootstrap

# Run Instructions

## Start Backend

Backend can be started by nativating to {root_folder_address}/backend/
Then backend server can be started by typing `nodemon server`

## Start Frontend

Backend can be started by navigating out to {root_folder_address}/
Then frontend server can be started by typing `npm start`

# Using the tool

Once the tool in started, type a number in text box.
This number will be saved on the backend server.
If the tool has been used previously then all previous entries will be also be fetched.
The previous entries for a particular user are fetched without user having to perform authentication. -->
