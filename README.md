Welcome to Mainstack career!

To run this app:

1. clone the repository
A. 
git@github.com:Apex184/mainstack-interview.git

# Get the code
git clone https://github.com/getlago/lago.git

# Go to Lago folder
cd lago

# Set up environment configuration
echo "LAGO_RSA_PRIVATE_KEY=\"`openssl genrsa 2048 | base64`\"" >> .env
source .env

# Start
docker-compose up

