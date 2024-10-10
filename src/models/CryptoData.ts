import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface for Crypto Data
 */
interface ICryptoData extends Document {
  name: string;
  price: number;
  market_cap: number;
  change_24h: number;
  fetched_at: Date;
}

/**
 * Mongoose schema for storing cryptocurrency data.
 */
const CryptoDataSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  market_cap: { type: Number, required: true },
  change_24h: { type: Number, required: true },
  fetched_at: { type: Date, required: true },
});

CryptoDataSchema.index({ name: 1, fetched_at: -1 });

const CryptoData = mongoose.model<ICryptoData>('CryptoData', CryptoDataSchema);
export default CryptoData;
