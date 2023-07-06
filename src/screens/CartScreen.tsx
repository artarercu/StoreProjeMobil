import { Button, Divider, Icon, Layout, Text, TopNavigation } from "@ui-kitten/components";
import React, { FC, useEffect, useState, } from "react"
import { Alert, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
// import Cart from "../components/Cart";
import { responsiveHeight, responsiveWidth } from "../constants/Dimension";
import { ICartItem } from "models/Model";
import CartItem from "components/CartItem";
import CustomHeader from "components/CustomHeader";
import { API_AddBasket, API_Basket, API_DeleteBasket } from "api/API";
import { IPacketItem, IProduct } from "models/Products";
import Toast from "react-native-toast-message";
import { SCREENS } from "navigation/navigation";
interface Props {
    navigation: any
}
const CartScreen: FC<Props> = (props) => {
    const [cartItems, setCartItems] = useState<IPacketItem[]>([]);

    const GetBasket = () => {
        API_Basket().then((response: any) => {
            console.log(response)
            setCartItems(response.items)
        }).catch((err) => {
            if (err.status == 404) {
                setCartItems([]);
            }
            else {
                console.log(err)
                Alert.alert("Hata Oluştu", "Basket çekilirken hat aoluştu.")
            }
        })

    }
    useEffect(() => {
        GetBasket();
    }, [])
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    const DeleteBasket = (productId: number, quantity: number) => {
        API_DeleteBasket({ quantity, productId }).then(() => {
            Toast.show({ type: 'success', text1: "Başarıyla silinmiştir." });
            GetBasket();
        }).catch(() => {
            Toast.show({ type: 'error', text1: "Silinirken bir hata oluştu" });
        })
    }
    const AddBasket = (id: number) => {
        API_AddBasket({ productId: id, quantity: 1 }).then(() => {
            Toast.show({ type: 'success', text1: "Başarıyla eklenmiştir." });
            GetBasket();
        }).catch(() => {
            Toast.show({ type: 'error', text1: "Eklenirken bir hata oluştu" });
        })
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <Layout style={{ flex: 1, }}>
                <CustomHeader goBack title="Sepetim" />
                {cartItems.length > 0 &&
                    <ScrollView style={{ flex: 1, }}>

                        {cartItems.map((item, index) => {
                            return (
                                <CartItem
                                    key={index}
                                    onDelete={() => {
                                        DeleteBasket(item.productId, item.quantity)
                                    }}
                                    increase={() => {
                                        AddBasket(item.productId)
                                    }}
                                    decrease={() => {
                                        DeleteBasket(item.productId, 1)
                                    }}
                                    item={item}
                                />
                            )
                        })}
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                        }} >
                            <Text style={{ fontSize: 20, textAlign: "right", marginRight: responsiveWidth(10), marginBottom: responsiveHeight(10), }}>{`Toplam Tutar:`}</Text>
                            <Text style={{ fontSize: 20, fontWeight: "700", textAlign: "right", marginRight: responsiveWidth(10), marginBottom: responsiveHeight(10), }}>{`${totalPrice} $`}</Text>
                        </View>
                    </ScrollView>
                }
                {cartItems.length == 0 ?
                    <View>
                        <Text style={{
                            fontSize: 30,
                            textAlign: "center",
                            fontWeight: "500",
                            marginTop: responsiveHeight(40),
                        }}>Sepetiniz Boş</Text>

                    </View>
                    :
                    <>

                        <Button style={{
                            marginHorizontal: responsiveWidth(25),
                        }}
                            onPress={() => props.navigation.navigate(SCREENS.AdressScreen)}
                        >
                            Sepeti Onayla</Button>
                    </>
                }
            </Layout>
        </SafeAreaView>
    )
}
export default CartScreen;
