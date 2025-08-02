import { styleGeneral } from "@/constants/StyleGeneral";
import { Func } from "@/utils/type";
import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text } from "../Themed";
import { useAppInfo } from "@/hooks/useAppInfo";

interface IProps {
    onPress?: Func;
    title: string;
    isLoading?: boolean;
}

export default function ButtonCustom({ onPress, title, isLoading = false }: IProps) {
    const { colors } = useAppInfo();

    return (
        <TouchableOpacity
            onPress={isLoading ? undefined : onPress}
            style={[
                style.flexCenter,
                style.buttonLogin,
                styleGeneral.BoxShadow,
                { backgroundColor: colors.tint, opacity: isLoading ? 0.6 : 1 }
            ]}
            activeOpacity={0.8}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={{ fontWeight: "600", fontSize: 16, color: "#fff" }}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    flexCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonLogin: {
        paddingVertical: 12,
        borderRadius: 8,
        paddingHorizontal: 20,
    },
});
