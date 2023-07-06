import React, { FC, useEffect, useState } from "react"
import { Alert, Image, ScrollView, View } from "react-native"
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "components/CustomHeader";
import { API_GetOrders } from "api/API";
import CustomText from "components/CustomText";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import { DBtoDate } from "utils/DBToDate";
type RootStackParamList = {
    Screen: {
        item: any
    };
};
interface Props {
    navigation: NavigationProp<any, any>
    route: RouteProp<RootStackParamList, 'Screen'>;
}

const OrderDetailScreen: FC<Props> = (props) => {
    const { item } = props.route.params;
    const [orders, setOrders] = useState<any[]>([]);
    useEffect(() => {
        API_GetOrders().then((response: any) => {
            console.log(response);
            setOrders(response);
        }).catch(() => {
            Alert.alert("Hata Oluştu", "Siparişler getirilirken hata oluştu")
        })
    }, []);
    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
            <CustomHeader goBack title={item.id + " Nolu Sipariş"} />
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: "#CCC",
                        margin: responsiveHeight(10),
                        padding: responsiveHeight(10)

                    }}
                >
                    <CustomText style={{ fontSize: 16 }}>{"Durum : " + item.orderStatus}</CustomText>
                    <CustomText style={{ fontSize: 16 }}>{"Alıcı Kullanıcı Adı : " + item.buyerId}</CustomText>
                    <CustomText style={{ fontSize: 16 }}>{"Sipariş Tarihi : " + DBtoDate(item.orderDate)}</CustomText>
                    <CustomText style={{ fontSize: 16 }}>{"Gönderim Ücreti : " + item.deliveryFee + "$"}</CustomText>
                    <CustomText style={{ fontSize: 16 }}>{"Ara Toplam : " + item.subTotal + "$"}</CustomText>
                    <CustomText style={{ fontSize: 16 }}>{"Toplam : " + item.total + "$"}</CustomText>
                    <CustomText style={{ textAlign: "center", fontWeight: "700", fontSize: 20, marginTop: responsiveHeight(10) }}>{"Ürünler"}</CustomText>
                    {item?.orderItems?.map((itemm: any, index: number) => {
                        return (
                            <View key={index} style={{
                                borderWidth: 1, borderRadius: 10,
                                borderColor: "gray", padding: 10, alignItems: "center", marginTop: responsiveHeight(15)
                            }}>
                                <Image
                                    resizeMode="contain"
                                    source={{ uri: itemm.pictureUrl }}
                                    style={{
                                        height: responsiveWidth(100),
                                        width: responsiveWidth(100)
                                    }}
                                />
                                <View>

                                    <CustomText>{"Ürün : " + itemm.name}</CustomText>
                                    <CustomText>{"Fiyat : " + itemm.price + "$"}</CustomText>
                                    <CustomText>{"Ürün Numarası : " + itemm.productId}</CustomText>
                                    <CustomText>{"Adet : " + itemm.quantity}</CustomText>
                                </View>
                            </View>
                        )
                    })}
                    <CustomText style={{ textAlign: "center", fontWeight: "700", fontSize: 20, marginTop: responsiveHeight(15) }}>{"Sipariş Adresi"}</CustomText>
                    <CustomText style={{ fontSize: 18 }}>{"Ad Soyad : " + item.shippingAddress.fullName}</CustomText>
                    <CustomText style={{ fontSize: 18 }}>{"Adres Başlığı : " + item.shippingAddress.address1}</CustomText>
                    <CustomText style={{ fontSize: 18 }}>{"Adres Detay : " + item.shippingAddress.address2}</CustomText>
                    <CustomText style={{ fontSize: 18 }}>{"Şehir : " + item.shippingAddress.city}</CustomText>
                    <CustomText style={{ fontSize: 18 }}>{"Ülke : " + item.shippingAddress.country}</CustomText>
                    <CustomText style={{ fontSize: 18 }}>{"Eyalet : " + item.shippingAddress.state}</CustomText>
                    <CustomText style={{ fontSize: 18 }}>{"Posta Kodu : " + item.shippingAddress.zipcode}</CustomText>
                </View>
                <View style={{ height: responsiveHeight(50) }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default OrderDetailScreen;