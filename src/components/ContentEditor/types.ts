export type ModifierType<Value> = {
  kind: string
  value: Value
}

export interface RendereableCMSDocument {
  nodes: WeakLayerNode[]
  schema: Schema
}

export interface WeakLayerNode {
  id: string
  kind: string
  modifiers?: ModifierType<any>[]
  disabled?: boolean
  props?: object
  nodes?: WeakLayerNode[]
}

export type WeakLayerNodeType = WeakLayerNode | string

export interface LayerNode extends WeakLayerNode {
  id: string
  type: React.ComponentType<any>
  name: string
  kind: string
  props: object
  collapsed?: boolean
  disabled?: boolean
  nodes: LayerNode[]
}

export interface Document extends RendereableCMSDocument {
  nodes: LayerNode[]
  schema: Schema
}

export interface LayerNode {
  id: string
  type: React.ComponentType<any>
  name: string
  kind: string
  props: object
  collapsed?: boolean
  disabled?: boolean
  nodes: LayerNode[]
}

export interface ComponentProperty {
  label: string
  type: string
  [key: string]: any
}

export interface ComponentSchema {
  [propName: string]: ComponentProperty
}

export interface EditableComponent<Props> extends React.ComponentClass<Props> {
  schema?: ComponentSchema
  layerIcon?: string
  layerFocusedIcon?: string
}

export interface StatelessEditableComponent<Props>
  extends React.StatelessComponent<Props> {
  schema?: ComponentSchema
  layerIcon?: string
  layerFocusedIcon?: string
}

export type EditableComponentType<Props> =
  | EditableComponent<Props>
  | StatelessEditableComponent<Props>

interface StatelessInputComponentContext {
  values: {
    [fieldName: string]: any
  }
  property: ComponentProperty
  Wrapper: React.StatelessComponent<{}>
}

export interface StatelessInputComponentProps {
  context: StatelessInputComponentContext
  value: any
  onBlur: () => void
  onChange: (newValue: any) => void
}

export interface StatelessInputComponent<Props>
  extends React.StatelessComponent<Props & StatelessInputComponentProps> {}

export interface Schema {
  plainTypes: string[]
  modifiers?: { [kind: string]: Modifier<any> }
  inputs?: { [kind: string]: StatelessInputComponent<any> }
  types: { [kind: string]: EditableComponentType<any> }
}

export type ModifierContext = {
  schema: Schema
  // Component: React.ComponentType<any>
}

export interface Modifier<Value> {
  (
    props: { [propName: string]: any },
    value: Value,
    context: ModifierContext,
  ): object
}
