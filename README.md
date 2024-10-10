# Cryptocurrency Data Management API

## Overview
This API provides endpoints to manage cryptocurrency data, including fetching statistics and calculating standard deviation for price records.

## Features
- Fetch the latest cryptocurrency statistics, including price, market cap, and 24-hour change.
- Calculate the standard deviation of the last 100 price records for supported cryptocurrencies.

## Enhancements
- Database is indexed for faster query performance (based on name and fetched time).
- Deviation is calculated by using aggregate functions in MongoDB.
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
