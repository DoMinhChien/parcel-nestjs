FROM node:16

ENV RUN_MIGRATIONS true
ENV POSTGRES_HOST john.db.elephantsql.com
ENV POSTGRES_PORT 5432
ENV POSTGRES_USER=barwasnw
ENV POSTGRES_PASSWORD=7C2tI3Pf7NW1WMgO7l_-kKLMDwMxgcdl
ENV POSTGRES_DB=barwasnw

ENV CENTRAL_PORT=8444
ENV HTTP_PORT=8446
ENV SOCKET_PORT=8447
ENV GRPC_PORT=8448

# Create app directory
WORKDIR /workspace

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE $HTTP_PORT $SOCKET_PORT $GRPC_PORT
CMD [ "npm", "run", "start:dev" ]
