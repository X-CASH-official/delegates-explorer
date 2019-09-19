# XCASH_DPOPS - Delegates Website

Forked from [cdk-admin](https://github.com/codetok/cdk-admin), an Angular 6 admin panel using angular material & angular flex.




## Introduction

This website will give users
* A dashboard that will show how to vote for the delegate, the delegate fee, and how many blocks the delegate has found
* A place to view a detailed list of the blocks found by the delegate
* A place to view how many votes the delegate has and what public addresses, with their reserve proofs have voted for the delegate
* A place to view how many payments and how much X-CASH the delegate has paid
* A place to view how much X-CASH a user has earned from staking with the delegate

This website is for delegates that are planning to get elected by others voting for them. It provides an automatic way to pay users that have voted for you, and provides them an automatic way for them to view their payment history.
This website is not needed for a solo delegate.

**If you plan on running a delegates website or a delegates website, you will need to run the website on the same system as the DPOPS node**




## System Requirements
 
XCASH DPOPS will only run on a Linux/Unix OS at this time. We recommend installing this on a Ubuntu VPS/dedicated server (18.04) for the best compatibility.
 
**Minimum System Requirements:**  
Operating System: Ubuntu 18.04 (or higher)  
CPU: 4 threads  
RAM: 8GB  
Hard drive: 50GB  
Bandwidth Transfer: 500GB per month  
Bandwidth Speed: 30 Mbps
 
**Recommended System Requirements:**  
Operating System: Ubuntu 18.04 (or higher)  
CPU: 8 threads  
RAM: 16GB  
Hard drive: 100GB  
Bandwidth Transfer: 2TB per month  
Bandwidth Speed: 100 Mbps


 
 
## Dependencies

The following table summarizes the tools and libraries required to run XCASH DPOPS - Delegate Website

| Dependencies                                 | Min. version  | Ubuntu package            |
| -------------------------------------------- | ------------- | ------------------------- |
| Node.js                                      | 8             |  install from binaries    | 
| Angular                                      | 6             |  install from NPM         |
| XCASH_DPOPS                                  | latest version | [build from source](https://github.com/X-CASH-official/XCASH_DPOPS)

**If you want to run the website using SSL then you will need to install a webserver like nginx  
The readme shows you how to setup the website using HTTP, since there is no sensitive data in the website**




## Installation Process




### Installing Node.js from binaries

Visit [https://nodejs.org/en/download/current/](https://nodejs.org/en/download/current/) and download the "Linux Binaries" download and copy it to a folder

Then add Node.js to your path (replace "Node.js_folder" with the location of the bin folder in the folder you installed Node.js in  
`echo -e '\nexport PATH=Node.js_folder:$PATH' >> ~/.profile && source ~/.profile`

Note if your installing this on a root account then you need to run these additional commands  
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



### Updating node_modules

Now you need to install all of the dependicies for the website. Navigate to the folder with the package.json file, and then run  
`npm update`




### Redirect port 80 to 18283
Make sure to follow the steps to [setup the firewall for XCASH_DPOPS](https://github.com/X-CASH-official/XCASH_DPOPS#how-to-setup-the-firewall)



### Build XCASH_DPOPS - Delegates Website

To build XCASH_DPOPS - Delegates Website, naviagte to the folder with the package.json file, and then run  
`ng build --prod --aot`

It will then create a dist folder, compress the javascript using Uglify-JS and move all of the contents of this folder to your XCASH_DPOPS/delegates_website folder 
``` 
cd dist  
for f in *.js; do echo "Processing $f file.."; uglifyjs $f --compress --mangle --output "{$f}min"; rm $f; mv "{$f}min" $f; done  
rm -r /PATH_TO_XCASH_DPOPS_FOLDER/delegates_website/* && rm /PATH_TO_XCASH_DPOPS_FOLDER/delegates_website/*   
cd ../  
cp -a dist/* /PATH_TO_XCASH_DPOPS_FOLDER/delegates_website/ 
```


## Testing

To test that you have properly configured XCASH_DPOPS - Delegates Website, run the XCASH_DPOPS with the following flags  
`--test_data_add`  
This will add test data to the Mongo Database

Now run the website server again using the normal options.

Next, navigate to your servers IP address or website domain. You should now see the website and some test data. You can navigate through the website using the test data.

When you have verified that the website works correctly, remove the test data, by shutting down the XCASH_DPOPS and then run it with the following flag  
`--test_data_remove`