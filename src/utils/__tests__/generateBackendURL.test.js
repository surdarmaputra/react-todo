import generateBackendURL from '../generateBackendURL'

describe('generateBackendURL', () => {
  test('append path to base backend URL', () => {
    expect(generateBackendURL('/tasks')).toBe(`http://localhost:3001/tasks`)
  })

  test.each([undefined, null, false, ''])(
    'return base backend URL if path is %o',
    (path) => {
      expect(generateBackendURL(path)).toBe(`http://localhost:3001`)
    },
  )
})
