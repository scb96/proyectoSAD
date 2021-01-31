FROM node:latest

RUN mkdir -p /SAD
RUN mkdir -p /SAD/Services 
COPY frontend /SAD/Services/frontend

WORKDIR /SAD/Services/frontend

RUN rm -r node_modules

RUN npm install

EXPOSE 9050/tcp

CMD [ "node", "server.js" ]
