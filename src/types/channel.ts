export interface Channel {
  theme: ChannelTheme
  assets: {
    toolbarBrand?: string
  }
}

export interface ChannelTheme {
  colorPrimary: string
  colorAccent: string
}
