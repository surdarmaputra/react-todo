import generateBackendURL from "../generateBackendURL"

describe('generateBackendURL', () => { 
  test('append path to base backend URL', () => {
    expect(generateBackendURL('/tasks')).toBe(`http://mock-backend.com/tasks`)
  })

  test.each([undefined, null, false, ''])('return base backend URL if path is %o', path => {
    expect(generateBackendURL(path)).toBe(`http://mock-backend.com`)
  })
})