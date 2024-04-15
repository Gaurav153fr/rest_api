import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import animeModel from "./animeModel";

const addAnime = async (req: Request, res: Response, next: NextFunction) => {
  const { name, story, genre, rating } = req.body;
  if (!name || !story || !genre || !rating) {
    return next(createHttpError(400, "All fields are required"));
  }

  const newAnime = await animeModel.create({
    name,
    story,
    genre,
    rating,
  });
  res.json({ message: newAnime._id });
};

const getAnime = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  try {
    const anime = await animeModel.findById(id);
    res.json({ message: anime });
  } catch (error) {
    return next(createHttpError(400, { error }));
  }
};
export { addAnime, getAnime };
