#Base image
FROM node:alpine
#Set working directory
WORKDIR /usr/app

#Copy package.json
COPY ./package.json ./

#install dependencies
RUN npm install

#Copy rest of files
COPY ./ ./

#set startup command
CMD ["npm","start"]
