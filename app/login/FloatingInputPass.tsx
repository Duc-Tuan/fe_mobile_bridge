import { EyeIcon, EyeSlashIcon } from "@/assets/icons";
import { View } from "@/components/Themed";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Animated, StyleSheet, TextInput, TouchableOpacity } from "react-native";

interface IProps {
    control: any,
    name: any,
    label: any,
    rules: any
    colors?: string
}

export function FloatingInputPass({ control, name, label, rules, colors }: IProps) {
    const [isFocused, setIsFocused] = useState(false);
    const animatedLabel = useRef(new Animated.Value(0)).current;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, value } }) => {
                useEffect(() => {
                    Animated.timing(animatedLabel, {
                        toValue: isFocused || value ? 1 : 0,
                        duration: 200,
                        useNativeDriver: false,
                    }).start();
                }, [isFocused, value]);

                const labelStyle: any = {
                    position: 'absolute',
                    left: 12,
                    fontSize: animatedLabel.interpolate({
                        inputRange: [0, 1],
                        outputRange: [14, 16],
                    }),
                    top: animatedLabel.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, -20],
                    }),
                    color: '#fff',
                };

                return (
                    <View style={styles.container}>
                        <Animated.Text style={labelStyle}>{label}</Animated.Text>

                        <TextInput
                            style={styles.input}
                            secureTextEntry={!showPassword}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onChangeText={onChange}
                            value={value}
                            selectionColor={colors}
                            placeholderTextColor="#888"
                        />

                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => setShowPassword(prev => !prev)}
                        >
                            {!showPassword ?
                                <EyeSlashIcon color={'#ffffffa9'} />
                                :
                                <EyeIcon color={'#ffffffa9'} />
                            }
                        </TouchableOpacity>
                    </View>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: "transparent", },
    input: {
        backgroundColor: "transparent",
        height: 48,
        paddingHorizontal: 16,
        paddingRight: 40, 
        marginBottom: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        color: '#fff',
    },
    iconContainer: {
        position: 'absolute',
        top: "25%",
        right: 10,
        marginTop: -2,
    },
});
