/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const blogController = require("./node/controllers/blogController.js")

const path = require(`path`)

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@images": path.resolve(__dirname, "src/images"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@style": path.resolve(__dirname, "src/style"),
        "@templates": path.resolve(__dirname, "src/templates"),
      },
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await blogController.show({ graphql, actions })
  await doctorController.show({ graphql, actions })
}
