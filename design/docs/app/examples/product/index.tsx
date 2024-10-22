import React from 'react'
import Layout from '@theme/Layout'
import Example from '@site/docs/lib/examples/product'

export default function Page() {
  return (
    <Layout>
      <article className='container'>
        <h1>Product</h1>
        <Example />
      </article>
    </Layout>
  )
}
