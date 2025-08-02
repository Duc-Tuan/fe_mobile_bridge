import { OpenParcelIcon } from "@/assets/icons"
import { Text, View } from "@/components/Themed"
import { styleGeneral } from "@/constants/StyleGeneral"
import { useAppInfo } from "@/hooks/useAppInfo"
import { StyleSheet, useWindowDimensions } from "react-native"

const Emtylogin = () => {
    const { colors, t } = useAppInfo();
    const layout = useWindowDimensions();
    return <View style={[styleGeneral.flexCenter, styles.container, { height: layout.height - 120 }]}>
        <OpenParcelIcon color={colors.tabIconDefault} width={60} height={60} />
        <Text style={{ color: colors.tabIconDefault, marginTop: 10 }}>{t("Bạn cần đăng nhập để xem thông tin này.")}</Text>
    </View>
}
export default Emtylogin

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
    }
})