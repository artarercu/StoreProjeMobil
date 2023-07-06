import { Button } from "@ui-kitten/components";
import React, { FC, useEffect, useState } from "react"
import { Alert, Image, ScrollView, View } from "react-native"
import Cart from "components/Cart";
import { API_AddBasket, API_GetProducts } from "api/API";
import { IProduct } from "models/Products";
import CustomText from "components/CustomText";
import CustomHeader from "components/CustomHeader";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Store from "Store/Store";
import API from "api/Instance";
import { SCREENS } from "navigation/navigation";
interface Props {
    navigation: any
}
const HomeScreen: FC<Props> = (props) => {

    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
            <CustomHeader title="Ana Sayfa" rightComp={<Cart navigation={props.navigation} />} />
            <View style={{ flex: 1, marginHorizontal: responsiveWidth(10), marginTop: responsiveHeight(10), alignItems: "center" }}>
                <Button size="large" style={{ width: responsiveWidth(300), marginTop: responsiveHeight(20) }} onPress={() => props.navigation.navigate(SCREENS.ProductScreen)}>Ürünler</Button>
                <Button size="large" style={{ width: responsiveWidth(300), marginTop: responsiveHeight(20) }} onPress={() => props.navigation.navigate(SCREENS.OldOrdersScreen)}>Geçmiş Siparişler</Button>
                <Button size="large" style={{ width: responsiveWidth(300), marginTop: responsiveHeight(20) }} onPress={() => {
                    Store.Logout()
                    API.setAuthorizationHeader("");
                }}>Çıkış Yap</Button>
            </View>
        </SafeAreaView>
    )
}
export default HomeScreen;

