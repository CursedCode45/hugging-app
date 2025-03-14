import * as React from "react";
import Svg, { Path } from "react-native-svg";


const EMAIL_SVG = ({color}) => (
  <Svg
    fill={color}
    viewBox="0 0 29 29"
  >
    <Path d="M2 7.42v14.172l7.086-7.086zM3.408 6l8.971 8.971c1.133 1.133 3.109 1.133 4.242 0L25.592 6H3.408z" />
    <Path d="M18.035 16.385c-.943.944-2.199 1.465-3.535 1.465s-2.592-.521-3.535-1.465l-.465-.465L3.42 23h22.16l-7.08-7.08-.465.465zM19.914 14.506 27 21.592V7.42z" />
  </Svg>
);
export default EMAIL_SVG;
