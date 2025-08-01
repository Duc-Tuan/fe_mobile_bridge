import { useAnimatedHeaderStyle } from "@/hooks/useAnimatedHeaderStyle";
import Animated from "react-native-reanimated";

interface IProps {
    children: any
}

export default function BodyWithAnimation({ children }: IProps) {
    const { animatedStyle } = useAnimatedHeaderStyle(500, 'up');
    return (
        <Animated.View
            style={[animatedStyle, { flex: 1 }]}
        >
            {children}
        </Animated.View>
    );
}