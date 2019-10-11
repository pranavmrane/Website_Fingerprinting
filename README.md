# Core Idea

The objective of this project is to demonstrate Browser Fingerprinting. Browser Fingerprinting allows web services to track your interaction on a website.

The most recent interactions can be tied back to previous interactions. All of this can be done without login information or cookies.

## Pre-Requisites

### Linux Users

Start Terminal (Ctrl + Alt + T)

```
cd ~
git clone https://github.com/pranavmrane/Website_Fingerprinting.git
cd Website_Fingerprinting/
sudo bash setupEnvStartBackend.sh
```

Start New Terminal(Ctrl + Alt + T)

```
bash startFrontEnd.bash
```

This should install all system requirements and start the servers. For more details on starting servers separately checkout the section titled 'Run Instructions'

### Non-Linux Users

The process needs npm, node and react installed on the machine. The instructions for installation are specified [here](https://nodejs.org/en/):

The project files must also be cloned in a folder.

Furthermore Additonal Packages are also required for the project to function.The instructions for installation are specified [here](https://www.tutorialsteacher.com/nodejs/what-is-node-package-manager)

#### Backend Packages Required(Inside backend folder)

- nodemon(installed globally)
- install
- express
- cors
- mongoose
- dotenv
- hashcode

#### FrontEnd Packages Required(Inside root folder)

- axios
- react-router-dom
- bootstrap

## Run Instructions

### Start Backend

Backend can be started by nativating to {root_folder_address}/backend/
Then backend server can be started by typing `nodemon server`

### Start Frontend

Backend can be started by nativating out to {root_folder_address}/
Then frontend server can be started by typing `npm start`

## Using the tool

Once the tool in started, type a number in text box.
This number will be saved on the backend server.
If the tool has been used previously then all previous entries will be also be fetched
