FROM node:14-alpine as publish

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./src/package*.json ./

RUN npm ci --only=production

# Bundle app source
COPY ./src/ .

EXPOSE 3000
CMD [ "node", "index.js" ]

# Use non-root user
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node