import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "@components/layout"
import SEO from "@components/seo"
import { filterPageForTemplate } from "@templates/utilities/templateUtils"

export default props => {
  const page = filterPageForTemplate(
    props.data.allWpPage.edges,
    props.pageContext.wordpressUri
  )

  return (
    <Layout>
      <SEO title={page.title} />
      <h4>{page.title}</h4>
      <h4>All Posts:</h4>
      {props.data.allWpPost.edges.map(({ node }) => (
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
  query BlogQuery {
    allWpPage(filter: { acfPageMeta: { pageTemplate: { eq: "blog" } } }) {
      edges {
        node {
          id
          uri
          title
        }
      }
    }
    allWpPost {
      edges {
        node {
          title
          slug
          uri
        }
      }
    }
  }
`
