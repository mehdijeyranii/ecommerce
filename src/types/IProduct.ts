import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  countInStock: number;
  category: string;
  rating: number;
  numReviews: number;
}
