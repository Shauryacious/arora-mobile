import { RouteObject } from 'react-router-dom'

export type AppRoute = RouteObject & {
  path: string
  name?: string
  protected?: boolean
}

