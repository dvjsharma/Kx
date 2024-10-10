import axios from 'axios';
import CryptoData from '../models/CryptoData';

const COINS = ['bitcoin', 'matic-network', 'ethereum'];
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets';

/**
 * Fetch cryptocurrency data from CoinGecko API when invoked and store it in the database.
 */
export const fetchCryptoData = async (): Promise<void> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        vs_currency: 'usd',
        ids: COINS.join(','),
        per_page: COINS.length,
        page: 1,
        precision : 2,
      },
      headers: {
        x_cg_demo_api_key : process.env.COINGECKO_API_KEY
      },
    });

    const data = response.data;
    for (const coin of data) {
      await CryptoData.create({
        name: coin.id,
        price: coin.current_price,
        market_cap: coin.market_cap,
        change_24h: coin.price_change_percentage_24h,
        fetched_at: new Date(),
      });
    }

    console.log('- Crypto data fetched and stored.');
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
};
