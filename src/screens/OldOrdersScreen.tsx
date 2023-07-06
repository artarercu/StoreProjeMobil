import React, { FC, useEffect, useState } from "react"
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native"
import { NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "components/CustomHeader";
import { API_GetOrders } from "api/API";
import CustomText from "components/CustomText";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import { Button } from "@ui-kitten/components";
import { SCREENS } from "navigation/navigation";
interface Props {
    navigation: NavigationProp<any, any>
}
const OldOrdersScreen: FC<Props> = (props) => {
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
            <CustomHeader goBack title="Geçmiş Siparişler" />
            <ScrollView style={{ flex: 1, marginHorizontal: responsiveWidth(20) }}>
                {orders.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                borderWidth: 1,
                                borderRadius: 10,
                                borderColor: "#CCC",
                                margin: responsiveHeight(10),
                                padding: responsiveHeight(10)
                            }}
                        >
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Image
                                    resizeMode="contain"
                                    source={{ uri: item.orderItems[0].pictureUrl }}
                                    style={{
                                        height: responsiveWidth(100),
                                        width: responsiveWidth(100)
                                    }}
                                />
                                <View style={{ justifyContent: "center", width: responsiveWidth(175), }}>
                                    <CustomText>{"Sipariş Numarası : " + item.id}</CustomText>
                                    <CustomText>{"Toplam : " + item.total + "$"}</CustomText>
                                </View>
                            </View>
                            <Button size="small" onPress={() => props.navigation.navigate(SCREENS.OrderDetailScreen, { item: item })}>Detayı Gör</Button>

                        </View>)
                })}
            </ScrollView>
        </SafeAreaView>
    )
}
export default OldOrdersScreen;