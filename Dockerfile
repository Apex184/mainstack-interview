# Step 1 : Builder image
FROM node:20-alpine AS builder

# Create app user
RUN addgroup -S app && adduser -S -G app -s /bin/false app
ENV HOME=/home/app

# Create app directory
COPY --chown=app:app package.json $HOME/node/

# Install app dependencies
USER app
WORKDIR $HOME/node
RUN npm install

# Bundle app source
USER root
COPY --chown=app:app . $HOME/node/

USER app
RUN npm run build

# Step 2 : Run image
FROM node:20-alpine
RUN apk add --upgrade apk-tools
RUN apk upgrade --available

# Create app user
RUN addgroup -S app && adduser -S -G app -s /bin/false app
ENV HOME=/home/app

# Create app directory
COPY --chown=app:app package.json $HOME/node/

# Install app dependencies
USER app
WORKDIR $HOME/node
RUN npm install --only=production

COPY --from=builder $HOME/node/ $HOME/node/

EXPOSE 80

CMD [ "npm", "start" ]
