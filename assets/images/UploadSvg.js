import * as React from "react"
import Svg, { Path } from "react-native-svg"


const UPLOAD_SVG = (props) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5.56 21c5.57-9.9 10.2-11.64 15.44-5.21"
    />
    <Path
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.28 3H5a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-5M18.75 8.83v-8M15.55 4.03l3.2-3.2 3.2 3.2"
    />
  </Svg>
)
export default UPLOAD_SVG
