FROM node:18-alpine
WORKDIR /usr/app
COPY ./ /usr/app

## Server ARGS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ARG EXPOSE_PORT=3000
ARG SYSTEM_ENV="DEV"
ARG ENABLE_LOCAL_LOG="true"

## other services ARGS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ARG DATABASE_URL="postgresql://postgres:exmaple@localhost:5432"

## Server ENV ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ENV SYSTEM_PORT=${EXPOSE_PORT}
ENV ENABLE_LOCAL_LOG=${ENABLE_LOCAL_LOG}
ENV SYSTEM_ENV=${SYSTEM_ENV}

## other services ENV ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ENV DATABASE_URL=${DATABASE_URL}
ENV LOGGING_ENDPOINT="${DATABASE_URL}/logs"

## set up min directory for project
WORKDIR /user/app
COPY ./ /user/app/
COPY package*.json /user/app/
COPY jabPrisma.ts /user/app/
COPY .npmrc /user/app/
COPY babel.config.js /user/app/
COPY tsconfig.json /user/app/
RUN ls -a /user/app/
RUN ls -a /user/app/prisma/

## automated steps
RUN npm ci
RUN npm run append-prisma
COPY /prisma/* /user/app/prisma/
RUN ls -a /user/app/
COPY /prisma/* /user/app/
COPY ./ /user/app/
RUN npm run generate
RUN ls -a /user/app/prisma/
## final directory setup

EXPOSE ${EXPOSE_PORT}
CMD ["npm", "start"]