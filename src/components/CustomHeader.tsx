import React, { FC } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Icon } from "@ui-kitten/components";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
interface Props {
    title: string
    goBack?: boolean
    rightComp?: React.ReactElement
    leftComp?: React.ReactElement
}
const CustomHeader: FC<Props> = (props) => {
    const navigation: NavigationProp<any, any> = useNavigation();
    const { title, goBack, rightComp, leftComp } = props;
    return (
        <View
            style={{
                width: responsiveWidth(375),
                borderBottomWidth: 1,
                borderBottomColor: "#D3D3D3",
                height: responsiveHeight(50),
                justifyContent: "center",
                borderColor: "red",
            }}
        >
            {goBack &&
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        zIndex: 2,
                        left: responsiveWidth(3),
                        position: "absolute",
                    }}
                >
                    <Icon
                        fill="black"
                        style={{
                            height: responsiveHeight(45),
                            width: responsiveWidth(45),
                        }}
                        name='arrow-ios-back-outline'
                    />
                </TouchableOpacity>
            }
            {rightComp &&
                <View
                    style={{
                        zIndex: 2,
                        right: responsiveWidth(3),
                        position: "absolute",
                    }}
                >
                    {rightComp}
                </View>
            }
            {leftComp &&
                <View
                    style={{
                        zIndex: 2,
                        left: responsiveWidth(3),
                        position: "absolute",
                    }}
                >
                    {leftComp}
                </View>
            }
            <Text style={{
                color: "#000",
                fontSize: 20,
                textAlign: "center",
            }}>{title}</Text>
        </View>
    )
}
export default CustomHeader;