import { Button, Icon } from "@ui-kitten/components"
import { responsiveWidth } from "constants/Dimension"
import { SCREENS } from "navigation/navigation"
import React from "react"
import { TouchableOpacity, View } from "react-native"

interface Props {
    navigation: any
}
const Cart = (props: Props) => {
    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate(SCREENS.CartScreen)}
        >
            <Icon fill="blue" name="shopping-cart-outline" width={responsiveWidth(40)} height={responsiveWidth(40)}></Icon>
        </TouchableOpacity>
    )
    return (
        <View>
            <Button
                size="small"
                style={{
                    width: responsiveWidth(80),
                }}
                onPress={() => {
                    props.navigation.navigate(SCREENS.CartScreen);
                }}>
                Sepet
            </Button>
        </View>
    )
}
export default Cart;