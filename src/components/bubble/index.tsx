import React from 'react';
import Animated, {
  withTiming,
  withRepeat,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import useAsyncStorage from '../../hooks/asyncStorageHook';
// Styles
import bubbleStyle from './style';

interface BubblePropsInterface {
  defaultSize: number;
  backgroundColor: string;
  children: React.ReactNode;
  uniqueKey: string;
}
const Bubble = (props: BubblePropsInterface) => {
  const {backgroundColor, defaultSize, children} = props;
  const {translateY, translateX, setTranslatesValues, getTranslatesValues} =
    useAsyncStorage();
  const size = useSharedValue(0);
  const transY = useSharedValue(translateY);
  const transX = useSharedValue(translateX);
  /**
   * Bubble animation style
   */
  const bubbleAnimatedStyles = useAnimatedStyle(() => {
    const animations = {
      width: size.value,
      height: size.value,
      borderRadius: size.value / 2,
      transform: [{translateX: transX.value}, {translateY: transY.value}],
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

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context: {translateX: number; translateY: number}) => {
      context.translateX = transX.value;
      context.translateY = transY.value;
    },
    onActive: (event, context) => {
      const transXAux = event.translationX + context.translateX;
      const transYAux = event.translationY + context.translateY;
      transX.value = transXAux;
      setTranslatesValues(`${props.uniqueKey}_X`, transXAux);
      transY.value = transYAux;
      setTranslatesValues(`${props.uniqueKey}_Y`, transYAux);
    },
    onEnd: () => {},
  });
  React.useEffect(() => {
    size.value = defaultSize;
    getTranslatesValues(props.uniqueKey).then(({valueY, valueX}) => {
      transX.value = withTiming(valueX, {duration: 1000});
      transY.value = withTiming(valueY, {duration: 1000});
    });
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
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View
        style={[
          bubbleStyle.container,
          bubbleAnimatedStyles,
          {backgroundColor},
        ]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Bubble;

Bubble.defaultProps = {
  defaultSize: 100,
  backgroundColor: '#fc3774',
};
