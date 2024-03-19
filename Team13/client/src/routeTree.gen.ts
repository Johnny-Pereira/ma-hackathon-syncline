/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as FeedIndexImport } from './routes/feed/index'
import { Route as FeedOuCodeImport } from './routes/feed/$ouCode'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const FeedIndexRoute = FeedIndexImport.update({
  path: '/feed/',
  getParentRoute: () => rootRoute,
} as any)

const FeedOuCodeRoute = FeedOuCodeImport.update({
  path: '/feed/$ouCode',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/feed/$ouCode': {
      preLoaderRoute: typeof FeedOuCodeImport
      parentRoute: typeof rootRoute
    }
    '/feed/': {
      preLoaderRoute: typeof FeedIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  FeedOuCodeRoute,
  FeedIndexRoute,
])

/* prettier-ignore-end */
