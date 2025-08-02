// hooks/useAppInfo.ts
import { useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { RootState } from '@/redux/store';

export function useAppInfo() {
    const { colors }: any = useTheme();
    const colorScheme = useColorScheme();
    const { t } = useTranslation();
    const user = useSelector((state: RootState) => state.auth.user);
    const serverSymbolApi = useSelector((state: RootState) => state.auth.serverSymbolApi);
    const loadingGetMe = useSelector((state: RootState) => state.auth.loadingGetMe);
    const loadingGetServer = useSelector((state: RootState) => state.auth.loadingGetServer);
    const loadingLogin = useSelector((state: RootState) => state.auth.loading);

    return {
        colors,
        colorScheme,
        t,
        user,
        loadingGetMe,
        loadingGetServer,
        serverSymbolApi,
        loadingLogin
    };
}
