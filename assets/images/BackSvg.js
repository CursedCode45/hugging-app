import * as React from "react";
import Svg, { Path } from "react-native-svg";


const BACK_SVG = (props) => (
  <Svg
    fill='none'
    viewBox="0 0 24 24"
  >
    <Path fill={props.color} d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z" />
  </Svg>
);
export default BACK_SVG;
