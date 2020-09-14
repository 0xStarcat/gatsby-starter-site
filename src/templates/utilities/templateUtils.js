export const filterPageForTemplate = (allWpPageEdges, uri) => {
  const pagesMatchingUri = allWpPageEdges.filter(edge => edge.node.uri === uri)

  if (!pagesMatchingUri.length) return {}

  // returns first match
  return pagesMatchingUri[0].node
}
