import express, { Request, Response } from 'express';
import CryptoData from '../models/CryptoData';

const router = express.Router();

/**
 * Interface for the response of the /stats endpoint.
 */
interface CryptoStatsResponse {
  price: number;
  marketCap: number;
  '24hChange': number;
}

/**
 * API: Get the latest price, market cap, and 24h change of a cryptocurrency.
 */
router.get('/stats', async (req: Request, res: Response<CryptoStatsResponse | { error: string }>): Promise<any> => {
  const { coin } = req.query;

  const allowedCoins = ['bitcoin', 'ethereum', 'matic-network'];
  
  if (!coin || typeof coin !== 'string' || !allowedCoins.includes(coin)) {
    return res.status(400).json({ error: 'Invalid or missing coin parameter' });
  }

  try {
    const latestCryptoData = await CryptoData.findOne({ name: coin })
      .sort({ fetched_at: -1 });

    if (!latestCryptoData) {
      return res.status(404).json({ error: 'No data found for the requested coin' });
    }

    const response: CryptoStatsResponse = {
      price: latestCryptoData.price,
      marketCap: latestCryptoData.market_cap,
      '24hChange': latestCryptoData.change_24h,
    };

    return res.json(response);
  } catch (error) {
    console.error('Error fetching crypto stats:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
