import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "@components/layout"
import SEO from "@components/seo"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Posts" />
      <h4>Posts</h4>
      {data.allWpPost.edges.map(({ node }) => (
        <div>
          <Link to={node.uri}>
            <p>{node.title}</p>
          </Link>
        </div>
      ))}
    </Layout>
  )
}
export const pageQuery = graphql`
  query {
    allWpPost {
      edges {
        node {
          title
          uri
        }
      }
    }
  }
`
