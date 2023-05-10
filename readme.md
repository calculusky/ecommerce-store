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

#### Setup/Installation

First you'll want to clone this project into your working directory.

Next thing you'll want to do is install the dependencies on the
_package.json_ file, to do this run the below command.

```bash
$ pnpm install
```

You'll also need to configure your _.env_ file using the format provided in the _.env.example_ file.

1. create a new file with the name _.env_
2. copy the contents on the _.env.example_ and paste it on the newly
   created _.env_ file
3. edit your _.env_ file to match your desired set up

#### Running the app

```bash
# development
$ pnpm watch

# watch mode
$ pnpm watch

# production mode
$ pnpm build
```

#### Database Migration

You would need to run the script in the package.json file:

1. Run `pnpm prisma:generate` cli in the app root directory to generate database migration file.
2. Run `pnpm db:migrate` to migrate the generated migration.

#### Test

```bash
# unit tests
$ pnpm test
```
