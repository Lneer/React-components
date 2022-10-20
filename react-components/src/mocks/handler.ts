import { rest } from 'msw';
import pokemon from '../types/api/resultList.json';
import resorceList from '../types/api/persanalInfo.json';

export const handler = [
  rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(resorceList));
  }),

  rest.get('https://pokeapi.co/api/v2/pokemon/2/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(pokemon));
  }),
];
