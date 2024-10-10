import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { fetchCryptoData } from './jobs/fetchCryptoData';
import statsRoutes from './routes/statsRoutes';
import deviationRoutes from './routes/deviationRoutes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB client connected'))
  .catch((error) => console.log('Error connecting to MongoDB client:', error));

cron.schedule('0 */2 * * *', async () => {
  console.log('Fetching crypto data...');
  await fetchCryptoData();
});

app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, './openapi.yaml'));

app.use('/api/v1', statsRoutes);
app.use('/api/v1', deviationRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is up and burning on localhost:${PORT} 🔥`);
});
