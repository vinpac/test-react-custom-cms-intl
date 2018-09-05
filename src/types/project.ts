export interface Section {
  name: string
  slug: string
  projects: Project[]
}

export interface Catalogue {
  slug: string
  sections: Section[]
}

export interface Organization {
  id?: number
  slug: string
  name: string
}

export interface Address {
  city_state: string
  typed_address: string
  typed_address2: string
}

export interface WorkDisponibility {
  type: 'work'
  work: {
    weekly_hours: number
    description: string
    can_be_done_remotely: boolean
  }
}

interface JobDate {
  name: string
  start_date: string
  end_date: string
}

export interface JobDisponibility {
  type: 'job'
  job: {
    can_be_done_remotely: boolean
    dates: Array<JobDate>
    end_date?: string
    start_date?: string
  }
}

export type Disponibility = WorkDisponibility | JobDisponibility

export interface Project {
  id?: number
  slug: string
  name: string
  description: string
  address?: Address
  organization: Organization
  disponibility: Disponibility
  image?: {
    image_url: string
  }
}
