#Base image
FROM node:alpine
#Set working directory

#Set environment variable to allow for
# create-react-app to run in docker container
# (note that if ENV is set before FROM, docker build
# will produce an error
ENV CI=true

WORKDIR /usr/app

#Copy package.json
COPY ./package.json ./

#install dependencies
RUN npm install

#Copy rest of files
COPY ./ ./

#set startup command
CMD ["npm","start"]
