FROM node:16.16.0

# Install GIT
RUN apt-get update -yq --fix-missing \
  && apt-get install git -y

# Install Docker
RUN apt install docker.io -y
RUN docker --version

ENV NODE_ENV development