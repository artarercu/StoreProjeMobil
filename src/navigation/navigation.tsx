import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import { inject, observer } from "mobx-react";
import Store from "Store/Store";
import API from "api/Instance";
import AdressScreen from "screens/AdressScreen";
import ProductScreen from "screens/ProductScreen";
import OldOrdersScreen from "screens/OldOrdersScreen";
import OrderDetailScreen from "screens/OrderDetailScreen";
const Stack = createNativeStackNavigator();
const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen name={SCREENS.HomeScreen} component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name={SCREENS.CartScreen} component={CartScreen} options={{ headerShown: false }} />
            <Stack.Screen name={SCREENS.AdressScreen} component={AdressScreen} options={{ headerShown: false }} />
            <Stack.Screen name={SCREENS.ProductScreen} component={ProductScreen} options={{ headerShown: false }} />
            <Stack.Screen name={SCREENS.OldOrdersScreen} component={OldOrdersScreen} options={{ headerShown: false }} />
            <Stack.Screen name={SCREENS.OrderDetailScreen} component={OrderDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen name={SCREENS.SignInScreen} component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name={SCREENS.SignUpScreen} component={SignUpScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
const Navigation = inject("Store")(observer(() => {
    if (Store.user && Store.token) {
        API.setAuthorizationHeader(Store.token);
        console.log("token:", Store.token);
    }
    return (
        <NavigationContainer>
            {Store.user ? <RootStack /> : <AuthStack />}
        </NavigationContainer>
    )
}));
export default Navigation;
export const SCREENS = {
    CartScreen: "CartScreen",
    HomeScreen: "HomeScreen",
    SignUpScreen: "SignUpScreen",
    SignInScreen: "SignInScreen",
    AdressScreen: "AdressScreen",
    ProductScreen: "ProductScreen",
    OldOrdersScreen: "OldOrdersScreen",
    OrderDetailScreen: "OrderDetailScreen"
}