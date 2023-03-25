FROM golang:1.19-buster as builder

RUN apt-get update && \
    apt-get -qy full-upgrade && \
    apt-get install -qy curl && \
    apt-get install -qy apt-transport-https ca-certificates gnupg && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    echo "deb [arch=amd64] https://download.docker.com/linux/debian buster stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -qy docker-ce-cli && \
    apt-get install tree

WORKDIR /src
COPY go.* ./
RUN go mod download
COPY . ./