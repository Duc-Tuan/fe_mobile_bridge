
import { EditPencilIcon, FilterIcon, OpenParcelIcon } from '@/assets/icons';
import { Text } from '@/components/Themed';
import { useAppInfo } from '@/hooks/useAppInfo';
import { getserver } from '@/redux/auth/authSlice';
import { AppDispatch } from '@/redux/store';
import { Link, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import HeaderWithAnimation from '../(pages)/header/headerWithAnimation';
import BodyWithAnimation from '../(pages)/main';
import { checkToken } from '@/utils/general';

export default function PriceScreen() {
  const { t, colors, loadingGetServer, serverSymbolApi } = useAppInfo()
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

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
    (async () => {
      const isValid = await checkToken();
      if (isValid) {
        dispatch(getserver());
      }
    })();
  }, [])

  console.log(serverSymbolApi);

  return (
    <BodyWithAnimation>
      <Text style={{ color: colors.text }}>PriceScreen</Text>
      <OpenParcelIcon color={colors.tabIconDefault} />
    </BodyWithAnimation>
  );
}