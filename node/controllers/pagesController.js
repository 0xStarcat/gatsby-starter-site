const path = require(`path`)
const fs = require("fs") // Or `import fs from "fs";` with ESM

const createTemplatePage = (
  createPage,
  templatePath,
  wordpressUri,
  gatsbyUri
) => {
  return createPage({
    // Decide URL structure
    path: gatsbyUri,
    // path to template
    component: templatePath,
    context: {
      wordpressUri,
    },
  })
}

module.exports = {
  show: async ({ graphql, actions }) => {
    const { createPage } = actions
    const results = await graphql(`
      {
        allWpPage {
          edges {
            node {
              slug
              uri
              acfPageMeta {
                pageTemplate
              }
            }
          }
        }
      }
    `)

    return Promise.all(
      results.data.allWpPage.edges.map(async result => {
        const pageTemplate = result.node.acfPageMeta.pageTemplate

        // pageTemplate should match directory name exactly
        const templatePath = path.resolve(
          `./src/templates/${pageTemplate}/index.js`
        )

        if (!pageTemplate || !fs.existsSync(templatePath)) return // null pageTemplate, no page.
        const wordpressUri = result.node.uri
        if (result.node.uri === "/homepage/") {
          // create 2 pages for homepage - one at the WP permalink and one at the root
          createTemplatePage(
            createPage,
            templatePath,
            wordpressUri,
            wordpressUri
          )
          createTemplatePage(createPage, templatePath, wordpressUri, "/")
        } else {
          createTemplatePage(
            createPage,
            templatePath,
            wordpressUri,
            wordpressUri
          )
        }
      })
    )
  },
}
