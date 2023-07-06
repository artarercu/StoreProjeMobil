
import { Dimensions, PixelRatio } from 'react-native';
export const SCREEN_WIDTH = Dimensions.get("window").width
export const SCREEN_HEIGHT = Dimensions.get("window").height
export const responsiveWidth = (value: number) => SCREEN_WIDTH / (375 / value)
export const responsiveHeight = (value: number) => SCREEN_HEIGHT / (812 / value)
export const responsiveWidthScreen = (value: string) => {
    const screenWidth = Dimensions.get('window').width
    const elemWidth = parseFloat(value)
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
}
export const responsiveHeightScreen = (value: string) => {
    const screenHeight = Dimensions.get('window').height
    const elemHeight = parseFloat(value)
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
}
