FROM node:latest

RUN mkdir -p /SAD
RUN mkdir -p /SAD/Services 
COPY publisher /SAD/Services/emitter

WORKDIR /SAD/Services/emitter

RUN npm install

CMD [ "node", "emitter.js"]
