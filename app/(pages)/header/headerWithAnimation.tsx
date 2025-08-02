import { useAnimatedHeaderStyle } from "@/hooks/useAnimatedHeaderStyle";
import { useAppInfo } from "@/hooks/useAppInfo";
import Animated from "react-native-reanimated";

interface IProps {
    children: any
    color?: string
}

export default function HeaderWithAnimation({ children, color }: IProps) {
    const { animatedStyle } = useAnimatedHeaderStyle();
    const { colors } = useAppInfo()
    return (
        <Animated.View
            style={[
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingHorizontal: 6,
                    backgroundColor: color ?? colors.backgroundHeader,
                },
                animatedStyle,
            ]}
        >
            {children}
        </Animated.View>
    );
}