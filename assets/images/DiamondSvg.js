import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";


const DIAMOND_SVG = (props) => (
  <Svg
    {...props}
  >
    <Defs id="SvgjsDefs1002" />
    <G id="SvgjsG1008">
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 47.5 47.5"
        viewBox="0 0 47.5 47.5"
        {...props}
      >
        <Path
          fill="#ade1fd"
          d="M0 0h-6l-7-9h10l3 9z"
          transform="matrix(1.25 0 0 -1.25 17.5 5)"
          className="colorbdddf4 svgShape"
        />
        <Path
          fill="#215580"
          d="m0 0-7 9h-6l3-9H0z"
          transform="matrix(1.25 0 0 -1.25 46.25 16.25)"
          className="color5dadec svgShape"
        />
        <Path
          fill="#114065"
          d="M0 0h10L-8-21 0 0Z"
          transform="matrix(1.25 0 0 -1.25 33.75 16.25)"
          className="color4289c1 svgShape"
        />
        <Path
          fill="#60a1e4"
          d="M0 0h-10L8-21 0 0Z"
          transform="matrix(1.25 0 0 -1.25 13.75 16.25)"
          className="color8ccaf7 svgShape"
        />
        <Path
          fill="#60a1e4"
          d="m0 0-3-9h16l-3 9H0Z"
          transform="matrix(1.25 0 0 -1.25 17.5 5)"
          className="color8ccaf7 svgShape"
        />
        <Path
          fill="#215580"
          d="m0 0-8 21H8L0 0Z"
          transform="matrix(1.25 0 0 -1.25 23.75 42.5)"
          className="color5dadec svgShape"
        />
      </Svg>
    </G>
  </Svg>
);
export default DIAMOND_SVG;