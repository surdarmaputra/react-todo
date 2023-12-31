import { rest } from 'msw'

import tasksResponse from '../__mocks__/tasksResponse'

const handlers = [
  rest.post('http://localhost:3001/tasks', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 4,
        title: 'test',
      }),
    )
  }),

  rest.get('http://localhost:3001/tasks', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tasksResponse))
  }),

  rest.delete('http://localhost:3001/tasks/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}))
  }),
]

export default handlers
