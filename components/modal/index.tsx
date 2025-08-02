import { styleGeneral } from '@/constants/StyleGeneral';
import { useAppInfo } from '@/hooks/useAppInfo';
import { IServer } from '@/utils/type';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Animated, Easing } from 'react-native';

interface IProps {
    activeServer: IServer | null,
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

interface IDataSelected {
    title: string,
    path: string
}

const dataSelected: IDataSelected[] = [
    {
        title: "Biểu đồ",
        path: "/chart"
    },
    {
        title: "Chi tiết tài khoản",
        path: ""
    },
]

export default function ModalContainer({ activeServer, visible, setVisible }: IProps) {
    const { t } = useAppInfo()
    const [data, setData] = useState<IServer | null>(null)
    const { colors } = useAppInfo()
    const slideAnim = useRef(new Animated.Value(300)).current;

    useEffect(() => {
        setData(activeServer)
    }, [activeServer])

    useEffect(() => {
        if (visible) open()
    }, [visible])

    const open = () => {
        setVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const close = () => {
        Animated.timing(slideAnim, {
            toValue: 300,
            duration: 400,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
        });
    };

    return (
        <Modal transparent animationType="none" visible={visible}>
            <TouchableWithoutFeedback onPress={close}>
                <Animated.View style={[styles.overlay, { transform: [{ translateY: slideAnim }] }]}>
                    <View style={[styles.popup, styleGeneral.BoxShadow, { backgroundColor: colors.backgroundSetting }]}>
                        <BlurView intensity={50} tint="light" style={[StyleSheet.absoluteFill, { borderRadius: 12, overflow: "hidden" }]} />
                        <Text style={styles.title}>{data?.username}</Text>
                        <Text style={styles.title}>{data?.server}</Text>
                        <View style={[styleGeneral.flexCenter, styles.option, { flexDirection: "row", flex: 0, gap: 8 }]}>
                            {JSON.parse(data?.by_symbol ?? "[]")?.map((a: any, i: number) => {
                                return <Text key={i} style={{ color: colors.tint, fontWeight: "600", fontSize: 14 }}>{a}</Text>
                            })}
                        </View>

                        {dataSelected.map((item, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={styles.option}
                                onPress={() => {
                                    router.push(item.path)
                                    close()
                                }}
                                activeOpacity={0.6}
                            >
                                <Text style={[styles.optionText]}>
                                    {t(item.title)}
                                </Text>
                            </TouchableOpacity>
                        ))}

                    </View>

                    <TouchableOpacity onPress={close} style={[styles.cancelBtn, styleGeneral.BoxShadow, { backgroundColor: colors.backgroundSetting }]} activeOpacity={1}>
                        <BlurView intensity={50} tint="light" style={[StyleSheet.absoluteFill, { borderRadius: 12, overflow: "hidden" }]} />
                        <Text style={styles.cancelText}>{t("Hủy")}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    button: { backgroundColor: '#444', padding: 12, borderRadius: 8 },
    overlay: { flex: 1, justifyContent: 'flex-end' },
    popup: {
        paddingHorizontal: 16,
        paddingTop: 16,
        marginHorizontal: 12,
        marginBottom: 10,
        borderRadius: 12,
    },
    title: { fontSize: 16, textAlign: "center", fontWeight: "500" },
    option: {
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ffffff',
    },
    optionText: { fontSize: 17, textAlign: "center", paddingVertical: 4, fontWeight: "600" },
    cancelBtn: {
        marginBottom: 16,
        borderRadius: 12,
        paddingVertical: 16,
        marginHorizontal: 12,
        alignItems: 'center',
    },
    cancelText: { fontSize: 17, fontWeight: "600" },
});
