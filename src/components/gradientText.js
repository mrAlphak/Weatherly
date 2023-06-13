import {Svg, Path, Text, Defs, LinearGradient, Stop, TSpan} from 'react-native-svg'
import { View } from 'react-native'

const GradientText=({fontSize, fontFamily, viewBoxWidth, viewBoxHeight, children})=>{
    return (
        <View>
          <Svg width={fontSize} height={fontSize} viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <Text fill="url(#paint0_linear_15_3)" xmlSpace="preserve" style={{ whiteSpace: 'pre' }} fontFamily={fontFamily} fontSize={fontSize} letterSpacing={0}>
              <TSpan x={-7} y={70.9091}>{children}</TSpan>
            </Text>
            <Defs>
              <LinearGradient id="paint0_linear_15_3" x1={85} y1={-22} x2={85} y2={94} gradientUnits="userSpaceOnUse">
                <Stop stopColor="white" />
                <Stop offset={1} stopColor="white" stopOpacity={0} />
              </LinearGradient>
            </Defs>
          </Svg>
        </View>
      )
}

export default GradientText