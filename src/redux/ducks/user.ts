export type User = { name: string }
export type State = User | null

export const doSomethingWithUser = () => null

export default (user: User | null = null): State => user
