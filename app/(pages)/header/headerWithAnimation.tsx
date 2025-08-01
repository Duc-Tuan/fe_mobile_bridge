import { useAnimatedHeaderStyle } from "@/hooks/useAnimatedHeaderStyle";
import Animated from "react-native-reanimated";

interface IProps {
    children: any
}

export default function HeaderWithAnimation({ children }: IProps) {
    const { animatedStyle } = useAnimatedHeaderStyle();
    return (
        <Animated.View
            style={[
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingHorizontal: 6,
                    backgroundColor: '#d82161',
                },
                animatedStyle,
            ]}
        >
            {children}
        </Animated.View>
    );
}