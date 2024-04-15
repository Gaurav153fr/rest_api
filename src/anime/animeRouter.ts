import express from 'express'
import { addAnime, getAnime } from './animeController'
const animeRouter= express.Router()

animeRouter.post('/',addAnime)
animeRouter.get('/',getAnime)
export default animeRouter