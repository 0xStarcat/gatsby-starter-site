import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"

const CustomImage = props => {
  // builds srcset
  // detects device pixel ratio and assigns it to imgix url
  const source = width => {
    if (!props.src) return ""
    const url = props.src.split("?")[0]
    const search = props.src.split("?")[1]
    const parsed = queryString.parse(search) || {}
    parsed.w = width
    parsed.dpr = window.devicePixelRatio // device pixel ratio

    return `${url}?${queryString.stringify(parsed)}`
  }

  return (
    <img
      data-test-id="custom-image"
      srcSet={`
      ${source(576)} 576w,
      ${source(992)} 992w,
      ${source(props.width)}
    
    `}
      sizes="100vw"
      src={source(props.width)}
      alt={props.alt}
    />
  )
}

CustomImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number, // the width to tell Imgix to fetch
  format: PropTypes.string, // the format to tell Imgix to fetch
}

CustomImage.defaultProps = {}

export default CustomImage
