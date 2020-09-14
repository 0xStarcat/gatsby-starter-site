import React from "react"
import Layout from "@components/layout"
import { graphql, Link } from "gatsby"
import moment from "moment"
import gql from "graphql-tag"

import withPreview from "@components/withPreview"

const PostTemplate = props => {
  const post = props.preview
    ? props.preview.postBy.revisions.nodes[0] // grab the first revision
    : props.data.allWpPost.edges[0].node

  return (
    <Layout>
      <div>
        {props.preview && <p>Preview</p>}
        <h1>{post.title}</h1>
        <p>
          <Link href="/blog">Back</Link>
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.acf.content }} />
        <p> By: {post.author.node.name} </p>
        <p> Created On: {moment(post.date).format("MM/DD/YYYY")} </p>
        <p> Last Updated: {moment(post.modified).format("MM/DD/YYYY")} </p>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String) {
    allWpPost(filter: { slug: { eq: $slug, ne: null } }) {
      edges {
        node {
          title
          content
          acf {
            metaDescription
            content
          }
          slug
          date(formatString: "MM-DD-YYYY")
          modified(formatString: "MM-DD-YYYY")
          author {
            node {
              name
            }
          }
        }
      }
    }
  }
`

const PREVIEW_QUERY = gql`
  query BlogPreviewQuery($id: Int!) {
    postBy(postId: $id) {
      title
      revisions {
        nodes {
          title
          content
          acf {
            metaDescription
            content
          }
          slug
          date
          modified
          author {
            node {
              name
            }
          }
        }
      }
    }
  }
`

export default withPreview({ preview: PREVIEW_QUERY })(PostTemplate)
