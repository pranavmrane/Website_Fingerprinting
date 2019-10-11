
echo "Installing Node and Node Package Manager"
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

sudo apt-get install -y nodejs

sudo npm install npm@latest -g

node -v 
npm -v

cd ~/fingerprinting-app

echo "Setting up Backend Environment"
cd backend
sudo npm install -g nodemon
npm install express cors mongoose dotenv hashcode

cd ..

echo "Setting up Front End Environment"
npm install axios react-router-dom bootstrap

cd backend
echo "Staring Backend Server"
nodemon server


echo "Starting new terminal for Front End Server"
xterm -e "cd ~/fingerprinting-app; npm start"