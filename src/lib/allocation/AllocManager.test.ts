import AllocManager from './AllocManager'

describe('AllocManager', () => {
  it('should alloc and deallocate returning the right nodes', () => {
    const manager = new AllocManager<number>([
      { id: 'A', nodes: [1, 2, 3, 4, 5, 6] },
      { id: 'B', nodes: [7, 8, 9, 10] },
      { id: 'C', nodes: [11, 12, 13, 14, 15, 16] },
      { id: 'D', nodes: [17, 18, 19, 20, 21, 22] },
    ])

    const ids = [
      manager.alloc(3),
      manager.alloc(2),
      manager.alloc(80),
      manager.alloc(80),
    ]

    expect(manager.get(ids[0])).toEqual({ id: 'A', nodes: [1, 2, 3] })
    expect(manager.get(ids[1])).toEqual({ id: 'A', nodes: [4, 5] })
    expect(manager.get(ids[2])).toEqual({ id: 'A', nodes: [6] })
    expect(manager.get(ids[3])).toEqual({ id: 'B', nodes: [7, 8, 9, 10] })

    manager.deallocate(ids[1])

    expect(manager.get(ids[0])).toEqual({ id: 'A', nodes: [1, 2, 3] })
    expect(manager.get(ids[2])).toEqual({ id: 'A', nodes: [4, 5, 6] })
    expect(manager.get(ids[3])).toEqual({ id: 'B', nodes: [7, 8, 9, 10] })
  })
})
