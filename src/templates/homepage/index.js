import React from "react"
import { graphql } from "gatsby"

import Layout from "@components/layout"
import SEO from "@components/seo"
import { filterPageForTemplate } from "@templates/utilities/templateUtils"

const IndexPage = props => {
  console.log(props)
  const page = filterPageForTemplate(
    props.data.allWpPage.edges,
    props.pageContext.wordpressUri
  )
  return (
    <Layout>
      <SEO title={page.title} />
      <div>
        <h1>{page.title}</h1>
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomepageQuery {
    allWpPage(filter: { acfPageMeta: { pageTemplate: { eq: "homepage" } } }) {
      edges {
        node {
          id
          uri
          title
        }
      }
    }
  }
`
