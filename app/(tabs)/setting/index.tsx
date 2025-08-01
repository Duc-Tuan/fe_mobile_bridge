import { useColorScheme } from 'react-native';

import { Text } from '@/components/Themed';
import { useTheme } from '@react-navigation/native';

export default function SettingScreen() {
    const { colors } = useTheme();
    const colorScheme = useColorScheme();
    return (
        <>
            <Text>Setting</Text>
        </>
    );
}