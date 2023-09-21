# Notes from Startup
Using GitHub is super useful and allows for an easy way to interact with the internet. Always remember to commit changes and push them out to the repository.

## Server
Through AWS you can get a server running on EC2, need to make an instance first.

## Domain Name
Purchase a domain name through Route 53 (.click is super cheap)
Then you need to create a record of it using the ip address as well as a subdomain using a wildcard. This allows you to access the site with the name rather than just the ip address.

## GIT BASH
Use this to get in: . ~/.bashrc

To ssh: ssh -i [keyfile] ubuntu@54.174.116.248

## HTTPS
To make it secure go through the caddy file and update it. This allows you to access your website securely!
