import { Button, Text, Icon } from "@ui-kitten/components"
import React, { useState } from "react"
import { TouchableOpacity, Image, View } from "react-native"
import { responsiveHeight, responsiveWidth } from "../constants/Dimension"
import { ICartItem } from "models/Model"
import { IPacketItem, IProduct } from "models/Products"
interface Props {
    onDelete: () => void
    item: IPacketItem
    increase: () => void
    decrease: () => void
}
const CartItem = (props: Props) => {
    const price = props.item.price;
    return (
        <View
            style={{
                width: responsiveWidth(375),
                flexDirection: "row",
                paddingHorizontal: responsiveWidth(10),
                marginBottom: responsiveWidth(5),
                height: responsiveHeight(100),
                alignItems: "center",
                borderBottomColor: "gray",
                borderBottomWidth: 1,
            }}
        >
            <Image
                source={{ uri: props.item.pictureUrl }}
                style={{
                    height: responsiveWidth(80),
                    width: responsiveWidth(80),
                    backgroundColor: "white",
                    marginRight: responsiveWidth(5),
                }}
            />
            <View style={{
                height: responsiveHeight(100),
                alignItems: "center",
                justifyContent: "space-around",

            }} >
                <Text
                    numberOfLines={1}
                    style={{
                        fontWeight: "700",
                        fontSize: 16,
                        width: responsiveWidth(270),
                    }}>{props.item.name}</Text>
                <View
                    style={{
                        width: responsiveWidth(270),

                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        marginBottom: responsiveHeight(10),
                    }}
                >
                    <TouchableOpacity
                        style={{ width: responsiveWidth(30) }}
                        onPress={props.decrease}
                    >
                        <Icon fill='blue' name='minus-circle-outline' height={responsiveWidth(30)} width={responsiveWidth(30)} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontWeight: "700",
                            fontSize: 20,
                            width: responsiveWidth(40),
                            textAlign: "center",
                        }}
                    >{props.item.quantity}</Text>
                    <TouchableOpacity
                        style={{ width: responsiveWidth(30) }}

                        onPress={props.increase}
                    >
                        <Icon fill='green' name='plus-circle-outline' height={responsiveWidth(30)} width={responsiveWidth(30)} />
                    </TouchableOpacity>

                    <Text
                        style={{
                            fontWeight: "600",
                            fontSize: 16,
                            width: responsiveWidth(100),
                            textAlign: "right",
                        }}
                    >{`${props.item.quantity * price} $`}</Text>
                    <TouchableOpacity
                        style={{

                            width: responsiveWidth(30)
                        }}
                        onPress={() => props.onDelete()}
                    >
                        <Icon
                            fill='red'
                            name='trash-2-outline' height={responsiveWidth(30)} width={responsiveWidth(30)} />
                    </TouchableOpacity>


                </View>
            </View>

        </View >
    )
}
export default CartItem;