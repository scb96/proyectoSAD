FROM node:latest

RUN mkdir -p /SAD
RUN mkdir -p /SAD/Services 
COPY queue /SAD/Services/queue1

WORKDIR /SAD/Services/queue1

#RUN rm -r ../node_modules

RUN npm install

EXPOSE 9996/tcp

CMD [ "node", "queue.js", "9996", "9005", "9010" , "9040"]
