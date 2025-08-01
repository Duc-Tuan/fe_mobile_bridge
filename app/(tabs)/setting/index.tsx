import { FlatList, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import HeaderWithAnimation from '@/app/(pages)/header/headerWithAnimation';
import BodyWithAnimation from '@/app/(pages)/main';
import { BellNotificationIcon, ChevronRightIcon, LanguageIcon, MailIcon, UserIcon } from '@/assets/icons';
import { Text, View } from '@/components/Themed';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { IDateUser } from './types';

const accountInfo = {
    id: 'B006287',
    company: 'Exness Technologies Ltd',
    server: '263006287 – Exness-MT5Real37\nAccess Point #3',
};

const settingsData = [
    {
        title: 'Tài khoản mới',
        icon: UserIcon,
        iconColor: '#3aea57ff',
    },
    {
        title: 'Thông báo',
        icon: BellNotificationIcon,
        iconColor: '#d81f66ff',
    },
    {
        title: 'Hộp thư',
        icon: MailIcon,
        iconColor: '#37c3ffff',
    },

    {
        title: 'Ngôn ngữ',
        icon: LanguageIcon,
        iconColor: '#0044ffff',
        subtitle: 'Tiếng Việt',
    },
];

export default function SettingScreen() {
    const { colors } = useTheme();
    const colorScheme = useColorScheme();
    const [dateUser, setDateUse] = useState<IDateUser>()

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <HeaderWithAnimation>
                    <Text style={{ color: "white", fontWeight: '600', fontSize: 18 }}>Cài đặt</Text>
                </HeaderWithAnimation>)
        });
    }, [navigation]);
    
    return (
        // <ScrollView style={style.constainer}>
        <BodyWithAnimation >
            {/* Header Account Info */}
            <TouchableOpacity activeOpacity={0.8} style={{ position: "relative", marginTop: 20, overflow: 'hidden' }}>
                <View style={[style.flexCenter, style.header]}>
                    <Text style={[style.accountId, { color: colors.text }]}>{accountInfo.id}</Text>
                    <Text style={[style.company, { color: colors.text }]}>{accountInfo.company}</Text>
                    <Text style={[style.server, { color: colors.text }]}>{accountInfo.server}</Text>
                </View>

                <View style={[style.flexCenter, style.iconRightUser]}><ChevronRightIcon /></View>

                <View style={style.role}><Text style={{ fontWeight: '700', fontSize: 12 }}>Admin</Text></View>
            </TouchableOpacity>

            <FlatList
                data={settingsData}
                style={style.body}
                keyExtractor={(item, index) => index.toString()}
                // ItemSeparatorComponent={() => <View style={style.separator} />}
                renderItem={({ item }) => {
                    const Icon: any = item.icon;
                    return <TouchableOpacity style={[style.flexCenter, style.item]} activeOpacity={0.8}>
                        <View style={[style.flexCenter, style.icon, { backgroundColor: item.iconColor }]}>
                            <Icon color={'white'} />
                        </View>
                        <View style={[style.flexCenter, style.textContainer]}>
                            <View style={[{ backgroundColor: 'transparent', flex: 1 }]}>
                                <Text style={[style.title, { color: colors.text }]}>{item.title}</Text>
                                {item.subtitle && <Text style={{ fontSize: 12, color: colors.text, marginTop: 2 }}>{item.subtitle}</Text>}
                            </View>
                            <ChevronRightIcon color={colors.text} />
                        </View>
                    </TouchableOpacity>
                }}
            />
        </BodyWithAnimation>
        // </ScrollView>
    );
}

const style = StyleSheet.create({
    role: {
        position: 'absolute',
        backgroundColor: '#0000009e',
        top: 10,
        left: -30,
        paddingHorizontal: 30,
        paddingVertical: 5,
        transform: [{ rotate: '-45deg' }],
    },
    iconRightUser: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: '50%',
        right: 10,
        width: 24,
        marginTop: -12
    },
    flexCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    constainer: {
        flex: 1,
        backgroundColor: 'transparent', // dark theme
        paddingTop: 20,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#eeeeeeff',
        justifyContent: "flex-start",
        flexDirection: "column",
    },
    accountId: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    company: {
        fontSize: 14,
        marginTop: 4,
    },
    server: {
        fontSize: 13,
        marginTop: 2,
        lineHeight: 16,
        textAlign: "center",
    },
    body: {
        paddingTop: 20,
    },
    icon: {
        padding: 2,
        borderRadius: 6,
        width: 35,
        height: 35
    },
    item: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        padding: 10,
        backgroundColor: "#eeeeeeff",
        borderBottomWidth: 1,
        borderBottomColor: '#ffffffff'
    },
    textContainer: {
        backgroundColor: "transparent",
        marginLeft: 15,
        justifyContent: "space-between",
        flexDirection: "row",
        flex: 1
    },
    title: {
        color: '#fff',
        fontWeight: "700",
        fontSize: 14
    }
})