import { Button, Divider, Input, Layout, Text, TopNavigation } from "@ui-kitten/components";
import Store from "Store/Store";
import { API_SignIn } from "api/API";
import API from "api/Instance";
import { SCREENS } from "navigation/navigation";
import React, { FC, useState } from "react"
import { Alert, SafeAreaView, View } from "react-native"
interface Props {
    navigation: any
}
const SignInScreen: FC<Props> = (props) => {
    const Login = () => {
        API_SignIn(email, password).then((response: any) => {
            console.log(response)
            Store.SignIn(response.token);
            API.setAuthorizationHeader(response.token);
            // props.navigation.navigate(SCREENS.HomeScreen)
        }).catch((err) => {
            Alert.alert("Hata Oluştu", err.title);
        })
    }
    const [email, setEmail] = useState("Rexs51");
    const [password, setPassword] = useState("Rexs5151!");
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <Layout style={{ flex: 1, alignItems: 'center', }}>
                <Text style={{ fontSize: 20, marginTop: 50 }}>Giriş Yap</Text>
                <View style={{ width: 300, marginTop: (20) }}>
                    <Input
                        value={email}
                        placeholder="E-mail"
                        style={{ marginTop: (10) }}
                        onChangeText={(text) => {
                            setEmail(text);
                        }}
                    />
                    <Input
                        value={password}
                        placeholder="Password"
                        style={{ marginTop: (10) }}
                        onChangeText={(text) => {
                            setPassword(text);
                        }}
                    />
                    <Button
                        onPress={() => {
                            Login();
                        }}
                        style={{ marginTop: (10) }}
                    >Giriş Yap</Button>
                    <Button
                        onPress={() => {
                            props.navigation.navigate(SCREENS.SignUpScreen)
                        }}
                        style={{ marginTop: (10) }}
                    >Kayıt Ol</Button>
                </View>
            </Layout>
        </SafeAreaView>
    )
}
export default SignInScreen;