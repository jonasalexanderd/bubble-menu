import React from 'react';
import Animated, {
  withTiming,
  withRepeat,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
// Styles
import bubbleStyle from './style';

interface BubblePropsInterface {
  defaultSize: number;
  backgroundColor: string;
  children: React.ReactNode;
}
const Bubble = (props: BubblePropsInterface) => {
  const {backgroundColor, defaultSize, children} = props;
  const size = useSharedValue(0);
  /**
   * Bubble animation style
   */
  const bubbleAnimatedStyles = useAnimatedStyle(() => {
    const animations = {
      width: size.value,
      height: size.value,
      borderRadius: size.value / 2,
    };
    return {
      ...animations,
    };
  });

  /**
   * Get random value between two numbers
   * @param min
   * @param max
   */
  const generateRandomInteger = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max - min + 1));
  };

  React.useEffect(() => {
    size.value = defaultSize;
    const twoPercent = (2 * defaultSize) / 100;
    setTimeout(() => {
      size.value = withRepeat(
        withTiming(defaultSize + twoPercent, {
          duration: generateRandomInteger(1000, 2000),
        }),
        -1,
        true,
      );
    }, generateRandomInteger(1000, 1100));
  }, []);
  return (
    <Animated.View
      style={[bubbleStyle.container, bubbleAnimatedStyles, {backgroundColor}]}>
      {children}
    </Animated.View>
  );
};

export default Bubble;

Bubble.defaultProps = {
  defaultSize: 100,
  backgroundColor: '#fc3774',
};
