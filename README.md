# Cryptocurrency Data Management API

## Links

YouTube video explaining my approach: [KoinX context](https://youtu.be/4FPwz7qDCB0)

## Overview
This API provides endpoints to manage cryptocurrency data, including fetching statistics and calculating standard deviation for price records.

## Features
- Fetch the latest cryptocurrency statistics, including price, market cap, and 24-hour change.
- Calculate the standard deviation of the last 100 price records for supported cryptocurrencies.
- Automatic data fetching every 2 hours using cron jobs.

## Enhancements
- Database is indexed for faster query performance (based on name and fetched time).
- Deviation is calculated by using aggregation pipelines in MongoDB.
- TypeScript is used for static type checking and improved code quality.
- Error handling is implemented for invalid requests and database errors.
- API documentation is generated using Swagger UI.

## Packages
- **Node.js**: JavaScript runtime for server-side programming.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing cryptocurrency data.
- **Mongoose**: ODM library for MongoDB.
- **Axios**: Promise-based HTTP client for fetching cryptocurrency data.
- **Node-Cron**: Job scheduler for fetching cryptocurrency data at regular intervals.
- **Swagger-UI**: To host API documentation
- **YAMLjs**: For parsing YAML files in swagger

## Setup

1. Clone the repository

```bash
git clone https://github.com/dvjsharma/Kx.git
cd Kx
```

2. Install the dependencies

```bash
npm install --legacy-peer-deps
```

3. Create a `.env` file following the `.env.example` file and populate all fields

4. Build the project and copy the `openapi.yaml` file in `dist` dir for static serving

```bash
npx tsc
cp src/documentation/openapi.yaml dist
```

5. Start the server

```bash
node dist/server.js
```