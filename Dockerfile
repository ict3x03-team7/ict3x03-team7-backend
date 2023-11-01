FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

# RUN echo '#!/bin/sh' > startup.sh && \
#     echo 'npm run remigrate-database &' >> startup.sh && \
#     echo 'npm run start' >> startup.sh && \
#     chmod +x startup.sh

CMD ["./startup.sh"]