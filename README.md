# X-CASH Proof of Stake - Delegates Website

Forked from [cdk-admin](https://github.com/codetok/cdk-admin), an Angular 6 admin panel using angular material & angular flex.

## Introduction

This is the website for the [X-CASH Proof of Stake - Delegates Website Server](https://github.com/X-CASH-official/XCASH_proof_of_stake_delegates_website_server)

## Installation



### Cloning the repository

`git clone https://github.com/X-CASH-official/XCASH_proof_of_stake_delegates_website.git`



### Dependencies

The following table summarizes the tools and libraries required to build. 

| Dependencies                                 | Min. version  | Ubuntu package            |
| -------------------------------------------- | ------------- | ------------------------- |
| Node.js                                      | 8             |  install from binaries    | 
| Angular                                      | 6             |  install from NPM         | 
| NGINX                                        | any           |  `nginx`                  | 



### Installing Node.js from binaries

Visit [https://nodejs.org/en/download/current/](https://nodejs.org/en/download/current/) and download the "Linux Binaries" download and copy it to a folder

Then add Node.js to your path (replace "Node.js_folder" with the location of the bin folder in the folder you installed Node.js in  
`echo -e '\nexport PATH=Node.js_folder:$PATH' >> ~/.profile && source ~/.profile`

Note if your installing this on a root account (not recommend) then you need to run these additional commands  
`npm config set user 0`
`npm config set unsafe-perm true`



### Updating NPM

Now you need to update NPM  
`npm install -g npm`



### Installing Packages Globally Using NPM

Now you need to install Angular globally  
`npm install -g @angular/cli@latest`

Then you need to install Uglifyjs globally
`npm install -g uglify-js`



### Updating node_modules for X-CASH Proof of Stake - Delegates Website

Now you need to install all of the dependencies for the website. Navigate to the folder with the package.json file, and then run  
`npm update`



### NGINX Setup

Now you need to setup nginx so it will act as a reverse proxy to the website server. This will also allow you to setup SSL for the website if you want.

First install nginx  
`sudo apt install nginx`

Next setup the sites available. You can use the default file if just hosting one website on the server, or you can make another file if you need to host multiple websites on the server. The location of the files are at `/etc/nginx/sites-available`

A default setup for a non SSL website hosting one website, would look similar to this  
```
server {
        listen 80;
        listen [::]:80;

        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;

        server_name YOUR_DOMANIN_NAME_OR_IP_ADDRESS_OF_SERVER;

        location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Apply the changes to nginx  
`nginx -s reload`

Now create an html folder for the website. If you are going to host one website on the server, you can use the default html folder located at `/var/www/html` otherwise you will need to make another html folder inside a website named folder. For example `/var/www/YOUR_DOMANIN_NAME_OR_IP_ADDRESS_OF_SERVER/html`

### Build instructions

To build X-CASH Proof of Stake - Delegates Website Server, navigate to the folder with the package.json file, and then run  
`ng build --prod --aot`

It will then create a dist folder, compress the javascript using Uglify-JS and move all of the contents of this folder to your html folder for NGINX.  
`cd FOLDER_LOCATION_OF_DIST_FOLDER`
`for f in *.js; do echo "Processing $f file.."; uglifyjs $f --compress --mangle --output "{$f}min"; rm $f; mv "{$f}min" $f; done`
`rm /var/www/YOUR_DOMANIN_NAME_OR_IP_ADDRESS_OF_SERVER/html/* && rm -r /var/www/YOUR_DOMANIN_NAME_OR_IP_ADDRESS_OF_SERVER/html/*`
`cp -a dist/* /var/www/YOUR_DOMANIN_NAME_OR_IP_ADDRESS_OF_SERVER/html/`



## Running X-CASH Proof of Stake - Delegates Website
Make sure you now install the [X-CASH Proof of Stake - Delegates Website Server](https://github.com/X-CASH-official/XCASH_proof_of_stake_delegates_website_server), build it and then move the binary to the html folder, and then run it.


## Testing

To test that you have properly configured X-CASH Proof of Stake - Delegates Website and X-CASH Proof of Stake - Delegates Website Server, run the X-CASH Proof of Stake - Delegates Website Server with the following option  
`--test_data_add`  
This will add test data to the Mongo Database

Now run the website server again using the normal options.

Next, navigate to your servers IP address or website domain. You should now see the website and some test data. You can navigate through the website using the test data.

When you have verified that the website works correctly, remove the test data, by shutting down the website server and then run it with the following option  
`--test_data_remove`