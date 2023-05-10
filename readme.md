### Description

API for a fictional e-commerce store targeted to fulfill an assessment.

The API currently supports the below functionality:

-   User Authentication
-   Product Management
-   Order Management

#### TOOLS USED

-   Nodejs (version 16.15.0)
-   MySQL (version 8)
-   PNPM (8.4.0)
-   Webpack (version 5.75.0)
-   TypeScript (version 5.0.4)
-   Express (version 4.18.2)
-   Prisma Client (version 4.13.0)
-   Docker

#### Setup/Installation

First you'll want to clone this project into your working directory.

You'll also need to configure your _.env_ file using the format provided in the _.env.example_ file.

1. create a new file with the name _.env_
2. copy the contents on the _.env.example_ and paste it on the newly
   created _.env_ file
3. edit your _.env_ file to match the desired set up

#### Running the app

```bash
# docker
$ docker compose -f docker-compose.yml up -d

```

#### Test

```bash
# unit tests
$ pnpm test
```
