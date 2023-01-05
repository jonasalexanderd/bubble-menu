import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = () => {
  const [translateX, setTranslateX] = React.useState<number>(0);
  const [translateY, setTranslateY] = React.useState<number>(0);
  const getTranslatesValues = async (key: string) => {
    const valueY = await AsyncStorage.getItem(`${key}_Y`);
    const valueX = await AsyncStorage.getItem(`${key}_X`);
    if (valueY) {
      setTranslateY(Number(valueY));
    }
    if (valueX) {
      setTranslateX(Number(valueX));
    }
    return {valueY: Number(valueY), valueX: Number(valueX)};
  };
  const setTranslatesValues = async (key: string, value: number) => {
    await AsyncStorage.setItem(key, value.toString());
    if (key.includes('_X')) {
      setTranslateY(value);
    }
    if (key.includes('_Y')) {
      setTranslateY(value);
    }
  };

  return {
    getTranslatesValues,
    setTranslatesValues,
    translateX,
    translateY,
  };
};

export default useAsyncStorage;
