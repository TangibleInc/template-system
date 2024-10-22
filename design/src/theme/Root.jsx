import React from 'react'

/**
 * Add stateful logic that is not re-initialized across navigations
 * @see https://docusaurus.io/docs/next/swizzling#wrapper-your-site-with-root
 */
export default function Root({ children }) {

  // TODO: React Context provider

  return <>{children}</>
}
