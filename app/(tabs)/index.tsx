
import { Text, View } from '@/components/Themed';
import { useTheme } from '@react-navigation/native';
import HeaderWithAnimation from '../(pages)/header/headerWithAnimation';
import { useLayoutEffect } from 'react';
import { Link, useNavigation } from 'expo-router';
import { Pressable } from 'react-native';
import { EditPencilIcon, FilterIcon } from '@/assets/icons';
import BodyWithAnimation from '../(pages)/main';

export default function PriceScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

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

          <Text style={{ color: "white", fontWeight: '600', fontSize: 18 }}>Giá</Text>

          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <EditPencilIcon
                  color={'white'}
                  style={{ opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        </HeaderWithAnimation>
      ),
    });
  }, [navigation]);
  return (
    <BodyWithAnimation>
      <Text style={{ color: colors.text }}>PriceScreen</Text>
    </BodyWithAnimation>
  );
}