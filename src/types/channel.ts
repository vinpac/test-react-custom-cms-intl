export interface ImageDict {
  image_url: string
}

export interface Skill {
  id: number
  name: string
}

export interface Cause {
  id: number
  name: string
  slug: string
  image?: ImageDict
}

export interface Channel {
  theme: ChannelTheme
  assets: {
    toolbarBrand?: string
  }
  causes: Cause[]
  skills: Skill[]
}

export interface ChannelTheme {
  colorPrimary: string
  colorAccent: string
}
