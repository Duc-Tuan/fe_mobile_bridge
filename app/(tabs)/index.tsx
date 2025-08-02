
import { EditPencilIcon, FilterIcon, OpenParcelIcon } from '@/assets/icons';
import { Text, View } from '@/components/Themed';
import { useAppInfo } from '@/hooks/useAppInfo';
import { getserver } from '@/redux/auth/authSlice';
import { AppDispatch } from '@/redux/store';
import { Link, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import HeaderWithAnimation from '../(pages)/header/headerWithAnimation';
import BodyWithAnimation from '../(pages)/main';
import { applyOpacityToColor, checkToken } from '@/utils/general';
import Emtylogin from '../(pages)/emtylogin';
import { IServer } from '@/utils/type';
import { styleGeneral } from '@/constants/StyleGeneral';
import PullToRefreshScreen from '@/components/reloadPage';
import ModalContainer from '@/components/modal';


export default function PriceScreen() {
  const { t, user, colors, serverSymbolApi, loadingGetServer } = useAppInfo()
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<IServer[]>([])
  const [activeServer, setactiveServer] = useState<IServer | null>(null)
  const [visible, setVisible] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderWithAnimation>
          <Pressable onPress={() => { }}>
            {({ pressed }) => (
              <FilterIcon
                color={'white'}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>

          <Text style={{ color: "white", fontWeight: '600', fontSize: 18 }}>{t("Giá")}</Text>

          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <EditPencilIcon
                  color={'white'}
                  style={{ opacity: pressed ? 0.5 : 1 }}
                  width={20}
                  height={20}
                />
              )}
            </Pressable>
          </Link>
        </HeaderWithAnimation>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setactiveServer(serverSymbolApi[0])
    setData(serverSymbolApi)
  }, [serverSymbolApi])

  const handlClick = (data: IServer) => {
    setactiveServer(data);
    setVisible(true);
  }

  return (
    <BodyWithAnimation>
      {user ?
        <PullToRefreshScreen onRefresh={() => dispatch(getserver())} refreshing={loadingGetServer}>
          <View style={[styleGeneral.flexCenter, { gap: 14, paddingHorizontal: 10, paddingTop: 10 }]}>
            {data?.map((a, i) => {
              return (
                <TouchableOpacity key={i} activeOpacity={0.6} style={{ flex: 1 }} onPress={() => handlClick(a)}>
                  <Item color={colors} data={a} />
                </TouchableOpacity>)
            })}
          </View>
        </PullToRefreshScreen>
        :
        <Emtylogin />
      }

      <ModalContainer activeServer={activeServer} visible={visible} setVisible={setVisible} />
    </BodyWithAnimation >
  );
}

const Item = ({ data, color }: { data: IServer, color: any }) => {
  const { t } = useAppInfo()
  return (
    <View style={[styleGeneral.flexCenter, styleGeneral.BoxShadow, styles.containerItem]}>
      <Text style={{ color: color.text, fontWeight: "600", fontSize: 15 }}>{t("Tài khoản")}: {data.username}</Text>
      <Text style={{ color: color.text, fontWeight: "600", fontSize: 15 }}>{t("Máy chủ")}: {data.server}</Text>
      <Text style={{ color: color.text, fontWeight: "600", fontSize: 15 }}>{t("Cặp tiền")}: </Text>
      <View style={[styleGeneral.flexCenter, { flexDirection: "row", flex: 0 }]}>
        {JSON.parse(data.by_symbol)?.map((a: any, i: number) => {
          return <Text key={i} style={{ color: color.tint, fontWeight: "600", fontSize: 14 }}>{a}  </Text>
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    width: '100%',
    alignItems: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4
  }
})