import * as React from "react"
import Svg, { Path } from "react-native-svg"

const X_SVG = (props) => (
  <Svg
    viewBox="0 0 64 64"
  >
    <Path fill={props.color}
    d="M32 4a28 28 0 1 0 28 28A28 28 0 0 0 32 4Zm11.31 33.66a4 4 0 0 1-5.66 5.66L32 37.66l-5.66 5.66a4 4 0 0 1-5.66-5.66L26.34 32l-5.66-5.66a4 4 0 0 1 5.66-5.66L32 26.34l5.66-5.66a4 4 0 0 1 5.66 5.66L37.66 32Z" />
  </Svg>
)
export default X_SVG
