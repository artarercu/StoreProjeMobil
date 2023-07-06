import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { API_Register } from "api/API";
import { SCREENS } from "navigation/navigation";
import React, { FC, useState } from "react"
import { Alert, SafeAreaView, View } from "react-native"
interface Props {
    navigation: any
}
const SignUpScreen: FC<Props> = (props) => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <Layout style={{ flex: 1, alignItems: 'center', }}>
                <Text style={{ fontSize: 20, marginTop: 50 }}>Kayıt Ol</Text>
                <View style={{ width: 300, marginTop: (20) }}>
                    <Input
                        value={username}
                        placeholder="Kullanıcı Adı"
                        style={{ marginTop: (10) }}
                        onChangeText={(text) => {
                            setUserName(text);
                        }}
                    />
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
                            API_Register({ username: username, email: email, password: password }).then(() => {
                                Alert.alert("İşlem başarılı", "Hesabınız başarıyla oluşturulmuştur.")
                                props.navigation.goBack();
                            }).catch((err) => {
                                let firstError = null;
                                for (const key in err.errors) {
                                    if (err.errors.hasOwnProperty(key)) {
                                        firstError = err.errors[key][0];
                                        break;
                                    }
                                }
                                Alert.alert("Hata Oluştu", firstError);
                            })
                        }}
                        style={{ marginTop: (10) }}
                    >Kayıt Ol</Button>
                    <Button
                        onPress={() => {
                            props.navigation.goBack();
                        }}
                        style={{ marginTop: (10) }}
                    >Giriş Yap</Button>
                </View>
            </Layout>
        </SafeAreaView>
    )
}
export default SignUpScreen;