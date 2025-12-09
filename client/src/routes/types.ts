import { RouteObject } from 'react-router-dom'

export interface AppRoute extends RouteObject {
  path: string
  name?: string
  protected?: boolean
}

