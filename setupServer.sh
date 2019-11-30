cd /var/www

sudo apt-get update

sudo apt-get install -y build-essential openssl libssl-dev pkg-config

sudo curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

sudo apt-get install -y nodejs

sudo apt-get install npm -y

sudo npm cache clean -f

sudo npm install -g n

sudo n stable

sudo apt-get install nginx git -y

sudo apt-get install -y build-essential openssl libssl-dev pkg-config

cd /etc/nginx/sites-available

PUBLIC_IP=$(curl http://checkip.amazonaws.com)

rm Website_Fingerprinting

echo 'server {
    listen 80;
    location / {
        proxy_pass http://PUBLIC_IP_ADDRESS:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}' >> Website_Fingerprinting

sed -i "s/Connection upgrade/Connection \'upgrade\'/g" Website_Fingerprinting
sed -i "s/PUBLIC_IP_ADDRESS/${PUBLIC_IP}/g" Website_Fingerprinting

sudo rm default

sudo rm /etc/nginx/sites-enabled/Website_Fingerprinting

sudo ln -s /etc/nginx/sites-available/Website_Fingerprinting /etc/nginx/sites-enabled/Website_Fingerprinting

sudo rm /etc/nginx/sites-enabled/default

sudo npm install pm2 -g

cd /var/www/

sudo chown -R ubuntu Website_Fingerprinting

cd Website_Fingerprinting

cd src/components

sed -i "s/PUBLIC_IP_ADDRESS/${PUBLIC_IP}/g" actionlist.component.js

cd /var/www/Website_Fingerprinting

sudo npm install

sudo npm audit fix

cd /var/www/Website_Fingerprinting/backend

sudo npm install

