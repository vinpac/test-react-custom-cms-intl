import { generateRandomId } from '../../components/ContentEditor/Editor/utils'

interface ItemAllocation {
  id: string
  index: number
  offset: number
  length: number
}

interface AllocableItem<T> {
  id: any
  nodes: Array<T>
}

export default class AllocManager<T> {
  protected allocable: Array<AllocableItem<T>>
  protected allocations: ItemAllocation[]

  constructor(allocable: Array<AllocableItem<T>>) {
    this.allocable = allocable
    this.allocations = []
  }

  alloc = (length: number): string => {
    const id = generateRandomId()
    let offset: number = 0
    let index: number = 0
    const lastAllocation = this.allocations[this.allocations.length - 1]

    if (lastAllocation) {
      if (
        this.allocable[lastAllocation.index] &&
        this.allocable[lastAllocation.index].nodes.length >
          lastAllocation.offset + lastAllocation.length
      ) {
        index = lastAllocation.index
        offset = lastAllocation.offset + lastAllocation.length
      } else {
        index = lastAllocation.index + 1
      }
    }

    this.allocations.push({
      id,
      index,
      length,
      offset,
    })

    return id
  }

  deallocate = (id: string): void => {
    let index: number = -1
    this.allocations.some((allocation, i) => {
      if (allocation.id === id) {
        index = i
        return true
      }
      return false
    })

    if (index !== -1) {
      this.allocations.splice(index, 1)

      for (let i = index; i < this.allocations.length; i += 1) {
        const lastAllocation = this.allocations[i - 1]

        if (lastAllocation) {
          if (
            this.allocable[lastAllocation.index].nodes.length >
            lastAllocation.offset + lastAllocation.length
          ) {
            this.allocations[i].index = lastAllocation.index
            this.allocations[i].offset =
              lastAllocation.offset + lastAllocation.length
          } else {
            this.allocations[i].index = lastAllocation.index + 1
            this.allocations[i].offset = 0
          }
        }
      }
    }
  }

  get = (id: string): AllocableItem<T> => {
    const allocation = this.allocations.find(allocation => allocation.id === id)

    if (!allocation) {
      throw new Error('Invalid id. You must alloc first')
    }

    const item = this.allocable[allocation.index]

    if (!item) {
      return {
        id,
        nodes: [],
      }
    }

    return {
      id: item.id,
      nodes: item.nodes.slice(
        allocation.offset,
        allocation.offset + allocation.length,
      ),
    }
  }
}
