FROM node:latest

RUN mkdir -p /SAD
RUN mkdir -p /SAD/Services 
COPY worker /SAD/Services/worker

WORKDIR /SAD/Services/worker

RUN npm install

EXPOSE 9003/tcp

CMD [ "node", "worker.js"]
