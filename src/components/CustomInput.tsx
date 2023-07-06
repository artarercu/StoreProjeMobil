import { Icon, IconElement, Input, InputProps } from "@ui-kitten/components";
import React, { FC, ReactElement, useState } from "react"
import { Platform, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import CustomText from "./CustomText";
interface Props extends InputProps {
    error?: boolean
    errorText?: string
    title?: string
    viewStyle?: ViewStyle
    isPassword?: boolean
    onChangeTextUpperCase?: (value: string) => void
    personIcon?: boolean
}
const CustomInput: FC<Props> = (props) => {
    const { error, errorText, title, viewStyle, isPassword, personIcon } = props;
    const [secureTextEntry, setSecureTextEntry] = useState(false);
    const renderPasswordIcon = (props: any): ReactElement => (
        <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );
    const PersonIcon = (style: any): IconElement => (
        <Icon {...style} name='person' />
    );
    return (
        <View style={viewStyle}>
            {title &&
                <CustomText
                    style={{
                        color: "#000",
                        fontSize: 16,
                        marginBottom: 5,
                        marginLeft: 5
                    }}>{title}</CustomText>
            }
            {isPassword ?
                <Input
                    secureTextEntry={secureTextEntry}
                    accessoryRight={renderPasswordIcon}
                    status={error ? "danger" : props.value ? "success" : "basic"}
                    {...props}
                />
                :
                <Input
                    accessoryRight={personIcon ? PersonIcon : undefined}
                    onChangeText={(text: string) => {
                        props.onChangeTextUpperCase && props.onChangeTextUpperCase(text.toLocaleUpperCase("TR"));
                    }}
                    keyboardType={Platform.OS !== 'ios' && props.onChangeTextUpperCase ? "visible-password" : undefined}
                    secureTextEntry={Platform.OS !== 'ios' && props.onChangeTextUpperCase ? true : false}
                    passwordRules={""}
                    status={error ? "danger" : props.value ? "success" : "basic"}
                    {...props}
                />
            }
            {(errorText && error) &&
                <CustomText style={{ color: "red" }}>{errorText}</CustomText>
            }
        </View>
    )
}
export default CustomInput;



