FROM node:10-alpine

RUN mkdir -p /SAD
RUN mkdir -p /SAD/Services 
COPY frontend /SAD/Services/frontend

RUN mkdir -p /SAD/Services/frontend/node_modules && chown -R node:node /SAD/Services/frontend

WORKDIR /SAD/Services/frontend

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 9050/tcp

ENTRYPOINT [ "node", "server.js" ]
