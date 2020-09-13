import React from "react"
import PropTypes from "prop-types"

const ErrorRender = props => {
  return <pre className="error-render">{props.message}</pre>
}

ErrorRender.propTypes = {
  message: PropTypes.string,
}
ErrorRender.defaultProps = {
  message: ``,
}

export default ErrorRender
