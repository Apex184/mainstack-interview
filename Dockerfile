
FROM node:20-alpine AS builder

RUN addgroup -S app && adduser -S -G app -s /bin/false app
ENV HOME=/home/app


COPY --chown=app:app package.json $HOME/node/


USER app
WORKDIR $HOME/node
RUN npm install


USER root
COPY --chown=app:app . $HOME/node/

USER app
RUN npm run build


FROM node:20-alpine
RUN apk add --upgrade apk-tools
RUN apk upgrade --available


RUN addgroup -S app && adduser -S -G app -s /bin/false app
ENV HOME=/home/app


COPY --chown=app:app package.json $HOME/node/


USER app
WORKDIR $HOME/node
RUN npm install --only=production

COPY --from=builder $HOME/node/ $HOME/node/

EXPOSE 3000

CMD [ "npm", "start" ]
