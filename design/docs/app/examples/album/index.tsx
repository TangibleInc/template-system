import React from 'react'
import Layout from '@theme/Layout'
import Example from '@site/docs/lib/examples/album'

export default function Page() {
  return (
    <Layout>
      <article className='container'>
        <h1>Album</h1>
        <Example />
      </article>
    </Layout>
  )
}
