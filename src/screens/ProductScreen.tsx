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
interface Props {
    navigation: any
}
const ProductScreen: FC<Props> = (props) => {
    const [products, setProducts] = useState<IProduct[]>();
    useEffect(() => {
        API_GetProducts().then((response: any) => {
            setProducts(response);
        }).catch(() => {
            Alert.alert("Hata Oluştu", "Ürünler çekilirken hata oluştu.");
        })
    }, []);
    const AddBasket = (id: number) => {
        API_AddBasket({ productId: id, quantity: 1 }).then(() => {
            Toast.show({ type: 'success', text1: "Başarıyla eklenmiştir." });
        }).catch((res) => {
            if (res?.title) {
                Toast.show({ type: 'error', text1: res.title });
            } else {
                Alert.alert("Hata oluştu")
            }
        })
    };
    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
            <CustomHeader goBack title="Ürünler" rightComp={<Cart navigation={props.navigation} />} />
            <View style={{ flex: 1, marginHorizontal: responsiveWidth(10), marginTop: responsiveHeight(10), alignItems: "center" }}>
                <ScrollView style={{ flex: 1 }} >
                    {
                        products?.map((item) => {
                            return (
                                <View key={item.id} style={{ flexDirection: "row", borderWidth: 1, borderRadius: 10, borderColor: "#CCC", marginTop: responsiveHeight(10), alignItems: "center", padding: responsiveWidth(5) }}>
                                    <Image resizeMode="contain" style={{ height: responsiveWidth(90), width: responsiveWidth(90), marginHorizontal: responsiveWidth(5), marginVertical: responsiveWidth(5) }} source={{ uri: item.pictureUrl }} />
                                    <View>
                                        <CustomText numberOfLines={1} style={{ width: responsiveWidth(235), fontSize: 16, fontWeight: "700" }}>{item.name}</CustomText>
                                        <CustomText numberOfLines={3} style={{ width: responsiveWidth(235) }}>{item.description}</CustomText>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: responsiveHeight(10) }}>
                                            <CustomText style={{ fontSize: 16 }}>{"Fiyat: " + item.price + "$"}</CustomText>
                                            <Button size="small" style={{ width: responsiveWidth(120) }} onPress={() => AddBasket(item.id)} >Sepete Ekle</Button>
                                        </View>
                                    </View>

                                </View>
                            )
                        })
                    }
                    <View style={{ height: responsiveHeight(50) }} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default ProductScreen;

