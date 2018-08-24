export interface Action<P, M = any> {
  type: string
  payload: P
  meta?: M
}

export interface AddLayer extends Action<{ target: string }> {
  type: 'LAYER_ADD'
}

export interface MoveLayer extends Action<{ source: string; target: string }> {
  type: 'LAYER_MOVE'
}

export interface DeleteLayer extends Action<{ target: string }> {
  type: 'LAYER_DELETE'
}

export interface SelectLayer extends Action<{ layerPath: string }> {
  type: 'LAYER_SELECT'
}

export interface RenameLayer
  extends Action<{ layerPath: string; oldValue: string; input: string }> {
  type: 'LAYER_RENAME'
}

export interface SetLayerCollapsed
  extends Action<{ target: string; collapsed: boolean }> {
  type: 'LAYER_SET_COLLAPSED'
}

export interface ChangeLayerProperty<P>
  extends Action<{ layerPath: string; propertyKey: string; input: P }> {
  type: 'LAYER_CHANGE_PROP'
}

export interface ChangeLayerProperties
  extends Action<{ layerPath: string; nextProps: object }> {
  type: 'LAYER_CHANGE_PROPS'
}

export interface DuplicateLayer
  extends Action<{ sourcePath: string; targetPath: string }> {
  type: 'LAYER_DUPLICATE'
}

export type DispatchableActions =
  | DuplicateLayer
  | SetLayerCollapsed
  | SelectLayer
  | AddLayer
  | MoveLayer
  | DeleteLayer
  | RenameLayer
  | ChangeLayerProperty<any>
  | ChangeLayerProperties
export type HistoryType = DispatchableActions[]
