import React, { FC, useEffect, useState } from "react"
import { Alert, View } from "react-native"
import { NavigationProp } from "@react-navigation/native";
import CustomHeader from "components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_CreateOrder, API_CurrentAdress, API_CurrentUser, API_GetOrders } from "api/API";
import { Button } from "@ui-kitten/components";
import CustomInput from "components/CustomInput";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import { IAddress } from "models/Address";
import { SCREENS } from "navigation/navigation";
interface Props {
    navigation: NavigationProp<any, any>
}
const AdressScreen: FC<Props> = (props) => {
    const [address, setAddress] = useState<IAddress>({
        address1: "",
        address2: "",
        city: "",
        country: "",
        fullName: "",
        state: "",
        zipcode: ""
    })
    useEffect(() => {
        API_CurrentAdress().then((res) => {
            setAddress(res);
        }).catch(() => {
            Alert.alert("Sipariş çekilemedi");
        })
        getOrder()
    }, []);
    const CreateOrder = () => {
        API_CreateOrder(address).then((r) => {
            console.log(r);
            Alert.alert("Sipariş oluşturuldu");
            props.navigation.navigate(SCREENS.HomeScreen);
        }).catch(() => {
            Alert.alert("Sipariş oluşturulamadı");

        })
    };
    const getOrder = () => {
        API_GetOrders().then((res) => {
            console.log("orders", res)
        }).catch(() => {
            Alert.alert("Sipariş çekilemedi");

        })
    };
    const addressValid = () => {
        if (!address) {
            return true
        }
        let count = 0;
        for (const field in address) {

            const add: any = address;
            if (add[field].length >= 1) {
                count++;
            }
        }
        if (count == 7) {
            return false
        }
        return true;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <CustomHeader goBack title="Adres Ayarları" />
            <View style={{ marginHorizontal: responsiveWidth(20) }}>

                <CustomInput onChangeText={(val) => setAddress({ ...address, fullName: val })} value={address?.fullName} title="Ad Soyad" viewStyle={{ marginTop: responsiveHeight(10) }} />
                <CustomInput onChangeText={(val) => setAddress({ ...address, address1: val })} value={address?.address1} title="Adres 1" viewStyle={{ marginTop: responsiveHeight(10) }} />
                <CustomInput onChangeText={(val) => setAddress({ ...address, address2: val })} value={address?.address2} title="Adres 2" viewStyle={{ marginTop: responsiveHeight(10) }} />
                <CustomInput onChangeText={(val) => setAddress({ ...address, city: val })} value={address?.city} title="Şehir" viewStyle={{ marginTop: responsiveHeight(10) }} />
                <CustomInput onChangeText={(val) => setAddress({ ...address, state: val })} value={address?.state} title="Eyalet" viewStyle={{ marginTop: responsiveHeight(10) }} />
                <CustomInput onChangeText={(val) => setAddress({ ...address, zipcode: val })} value={address?.zipcode} title="Posta kodu" viewStyle={{ marginTop: responsiveHeight(10) }} />
                <CustomInput onChangeText={(val) => setAddress({ ...address, country: val })} value={address?.country} title="Ülke" viewStyle={{ marginTop: responsiveHeight(10) }} />
                <Button
                    style={{ marginTop: responsiveHeight(30) }}
                    disabled={addressValid()}
                    onPress={CreateOrder}
                >Siparişi Oluştur</Button>

                {/* <Button
                    onPress={getOrder}
                >Listele</Button>
                <Button
                    onPress={adress}
                >adress</Button> */}
            </View>
        </SafeAreaView>
    )
}
export default AdressScreen;