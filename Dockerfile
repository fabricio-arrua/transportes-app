FROM node:18

WORKDIR /var/www/transportes-app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]