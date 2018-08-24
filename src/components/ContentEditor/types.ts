import Schema from '~/components/ContentEditor/models/Schema'

export interface Document {
  nodes: Layer[]
}

export type ModifierDefinition<Value> = {
  kind: string
  value: Value
}

export interface LayerNode {
  id: string
  kind: string
  name?: string
  modifiers?: ModifierDefinition<any>[]
  disabled?: boolean
  props?: { [key: string]: any }
  nodes?: Node[]
}

export type Node = LayerNode | string

export interface RenderableDocument {
  nodes: Node[]
}

export interface Layer {
  id: string
  name: string
  kind: string
  modifiers: ModifierDefinition<any>[]
  disabled: boolean
  props: object
  collapsed?: boolean
  nodes?: LayerType[]
}

export type LayerType = Layer

export type ModifierContext = {
  schema: Schema
}

export interface Modifier<Value> {
  (
    props: { [propName: string]: any },
    value: Value,
    context: ModifierContext,
  ): object
}

export interface ModifiersMap {
  [kind: string]: Modifier<any>
}

export interface PropertyControl {
  type: string
  label: string
}

export interface ComponentOptions<C> {
  name?: string
  description?: string
  layerIcon?: string
  propertyControls?: C
  layerFocusedIcon?: string
  filterChildren?: (kind: string) => boolean
  filterParent?: (
    kind: string,
    component: React.ComponentType<any> | null,
  ) => boolean
}

export interface ComponentDefinition<C> extends ComponentOptions<C> {
  component: React.ComponentType<any>
}

export interface ComponentsMap<C> {
  [kind: string]: ComponentDefinition<C>
}

export interface InputComponentProps<Value> {
  label: string
  value: Value
  schema: Schema
  onChange: (newValue: Value) => void
  onBlur: (event?: React.SyntheticEvent) => void
}

export interface InputComponent<Value, Props>
  extends React.ComponentClass<Props & InputComponentProps<Value>> {
  defaultValue?: Value
}

export interface StatelessInputComponent<Value, Props>
  extends React.StatelessComponent<Props & InputComponentProps<Value>> {
  defaultValue?: Value
}

export type InputComponentType<Value, Props> =
  | StatelessInputComponent<Value, Props>
  | InputComponent<Value, Props>

export interface InputComponentsMap {
  [kind: string]: InputComponentType<any, any>
}
