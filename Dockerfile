FROM node:14.17.0
WORKDIR ./lib

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "test"]
