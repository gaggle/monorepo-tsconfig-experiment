import { Lib } from '.'

describe('Lib', () => {
  it('has #foo', () => {
    const lib = new Lib()
    expect(lib).toHaveProperty('foo')
  })
})
