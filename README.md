# Discovery

## Getting Started

To get a local copy of this template up and running on your machine, follow
these simple steps.

### Prerequisites

- Docker `curl -fsSL https://get.docker.com -o get-docker.sh`
  `sudo sh get-docker.sh` `sudo apt install docker-compose`

### Installation

- Clone the repo `git clone https://github.com/akshat2602/discovery.git`
- Change the current directory to the app `cd discovery`

### Running the service

- Build the docker containers `docker-compose -f docker-compose.dev.yml build`
  for the dev containers and `docker-compose -f docker-compose.prod.yml build`
  for the prod containers
- Run the docker containers `docker-compose -f docker-compose.dev.yml up` for
  the dev containers and `docker-compose -f docker-compose.prod.yml up` for the
  prod containers

### Running the client without Docker

- Change the current directory to client using `cd client`
- Install all dependencies using `npm i`
- Run the project using `npm run dev`

### Things to look for before committing

- Make sure you lint your frontend project before commiting
- Just run the command `npm run lint` so that eslint and prettier work their
  magic
