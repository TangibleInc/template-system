import React from 'react'
import Layout from '@theme/Layout'
import Example from '@site/docs/lib/examples/blog'

export default function Page() {
  return (
    <Layout>
      <article className='container'>
        <h1>Blog</h1>
        <Example />
      </article>
    </Layout>
  )
}
