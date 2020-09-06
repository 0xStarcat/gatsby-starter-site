const path = require(`path`)

module.exports = {
  show: ({ graphql, actions }) => {
    const { createPage } = actions
    return graphql(`
      {
        allWpPost(sort: { fields: [date] }) {
          edges {
            node {
              slug
              uri
              date(formatString: "MM-DD-YYYY")
            }
          }
        }
      }
    `).then(result => {
      result.data.allWpPost.edges.forEach(({ node }) => {
        createPage({
          // Decide URL structure
          path: node.uri,
          // path to template
          component: path.resolve(`./src/pages/blog/show.js`),
          context: {
            // This is the $slug variable
            // passed to blog-post.js
            slug: node.slug,
          },
        })
      })
    })
  },
}
