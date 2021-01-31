FROM node:latest

RUN mkdir -p /SAD
RUN mkdir -p /SAD/Services 
COPY queue /SAD/Services/queue2

WORKDIR /SAD/Services/queue2

RUN npm install

EXPOSE 9997/tcp
EXPOSE 9006/tcp
EXPOSE 9011/tcp
EXPOSE 9031/tcp
EXPOSE 9041/tcp

CMD [ "node", "queue.js", "9997", "9006", "9011" , "9041"]
