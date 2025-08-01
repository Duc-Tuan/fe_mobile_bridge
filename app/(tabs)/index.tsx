
import { Text, View } from '@/components/Themed';
import { useTheme } from '@react-navigation/native';

export default function PriceScreen() {
  const { colors } = useTheme();
  return (
    <View>
      <Text>PriceScreen</Text>
    </View>
  );
}