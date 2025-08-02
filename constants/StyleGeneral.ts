import { StyleSheet } from "react-native";

export const styleGeneral = StyleSheet.create({
    BoxShadow: {
        shadowColor: '#00000062',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 3,
    },
    flexCenter: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    backgroudTrans: {
        backgroundColor: 'transparent'
    }
})