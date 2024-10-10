import express, { Request, Response } from 'express';
import CryptoData from '../models/CryptoData';

const router = express.Router();

/**
 * Interface for the response structure
 */
interface DeviationResponse {
  deviation: number;
}

/**
 * Utility function to calculate the standard deviation of prices.
 */
const calculateStandardDeviation = (prices: number[]): number => {
  const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
  const squaredDiffs = prices.map(price => Math.pow(price - mean, 2));
  const variance = squaredDiffs.reduce((acc, diff) => acc + diff, 0) / prices.length;
  return Math.round(Math.sqrt(variance) * 100) / 100;

  // TODO: Can use mongoDB aggregation to calculate the standard deviation
  // const aggregationPipeline = [
  //   {
  //     $match: {
  //       name: coin // Match documents with the specified coin name
  //     }
  //   },
  //   {
  //     $sort: { fetched_at: -1 } // Sort by fetched_at in descending order
  //   },
  //   {
  //     $group: {
  //       _id: null, // Group all records together
  //       prices: { $push: "$price" } // Push the prices into an array
  //     }
  //   },
  //   {
  //     $project: {
  //       _id: 0, // Exclude the _id field from the result
  //       prices: { $slice: ["$prices", 100] } // Limit to the last 100 prices
  //     }
  //   },
  //   {
  //     $project: {
  //       deviation: {
  //         $stdDevSamp: "$prices" // Calculate the sample standard deviation
  //       }
  //     }
  //   }
  // ];
};

/**
 * API: Get the standard deviation of (last 100 if > 100 | ) price records
 */
router.get('/deviation', async (req: Request, res: Response<DeviationResponse | { error: string }>): Promise<any> => {
  const { coin } = req.query;

  const allowedCoins = ['bitcoin', 'ethereum', 'matic-network'];
  if (!coin || !allowedCoins.includes(coin as string)) {
    return res.status(400).json({ error: 'Invalid or missing coin parameter' });
  }

  try {
    const cryptoData = await CryptoData.find({ name: coin })
      .sort({ fetched_at: -1 })
      .limit(100);

    if (cryptoData.length === 0) {
      return res.status(404).json({ error: 'No data found for the requested coin' });
    }

    const prices = cryptoData.map(data => data.price);
    const deviation = calculateStandardDeviation(prices);

    const response: DeviationResponse = {
      deviation,
    };
    return res.json(response);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
