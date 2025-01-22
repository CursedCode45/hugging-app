import * as React from "react"
import Svg, { Defs, ClipPath, Path, Mask, G, Use } from "react-native-svg"


const PROFILE_SVG = (props) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      fill={props.color}
      d="M12 11.796c2.719 0 4.923-2.193 4.923-4.898C16.923 4.193 14.72 2 12 2S7.077 4.193 7.077 6.898c0 2.705 2.204 4.898 4.923 4.898ZM14.564 13.837H9.436C6.462 13.837 4 16.286 4 19.245c0 .714.308 1.327.923 1.633C5.846 21.388 7.897 22 12 22s6.154-.612 7.077-1.122A1.93 1.93 0 0 0 20 19.245c0-3.061-2.462-5.408-5.436-5.408Z"
    />
  </Svg>
)
export default PROFILE_SVG
