FROM node:latest

RUN mkdir -p /SAD
RUN mkdir -p /SAD/Services 
COPY queue /SAD/Services/queue3

WORKDIR /SAD/Services/queue3

RUN npm install

EXPOSE 9998/tcp
EXPOSE 9007/tcp
EXPOSE 9012/tcp
EXPOSE 9032/tcp
EXPOSE 9042/tcp

CMD [ "node", "queue.js", "9998", "9007", "9012" , "9042"]
