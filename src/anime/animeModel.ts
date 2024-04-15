import mongoose from "mongoose";
import { Anime } from "./animeType";

const animeSchema = new mongoose.Schema<Anime>({
  name: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  genre:[{
type:String,
required:true

      }],
},{timestamps:true});

export default mongoose.model<Anime>('Anime',animeSchema)