import { rest } from 'msw'
import pokemon from '../types/api/1.json'
import resorceList from '../types/api/2.json'

export const handler = [
	rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json(resorceList),
		)
	}),

	rest.get('https://pokeapi.co/api/v2/pokemon/2/', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json(pokemon)
		)
	})
]