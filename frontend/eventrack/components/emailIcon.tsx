import * as React from "react"
import Svg, { Path } from "react-native-svg"
const EmailIcon = () => (
  <Svg  width={22} height={21} fill="none">
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.52}
      strokeWidth={2}
      d="M15.23 10.5c0 2.332-1.96 4.222-4.378 4.222s-4.379-1.89-4.379-4.222c0-2.332 1.96-4.222 4.379-4.222 2.418 0 4.378 1.89 4.378 4.222Zm0 0v1.583c0 1.458 1.226 2.64 2.737 2.64 1.512 0 2.737-1.182 2.737-2.64V10.5c0-5.247-4.411-9.5-9.852-9.5C5.41 1 1 5.253 1 10.5S5.41 20 10.852 20h4.378"
    />
  </Svg>
)
export default EmailIcon