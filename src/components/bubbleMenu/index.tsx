import React from 'react';
import {View} from 'react-native';
// Components
import Bubble from '../bubble';
// Styles
import bubbleMenuStyle from './style';

interface BubbleMenuPropsInterface {
  items: Array<{
    content: React.ReactNode;
    defaultSize: number;
    backgroundColor: string;
    uniqueKey: string;
  }>;
}

const BubbleMenu = React.memo((props: BubbleMenuPropsInterface) => {
  return (
    <View style={bubbleMenuStyle.container}>
      {props.items.map((item, index) => (
        <Bubble
          defaultSize={item.defaultSize}
          backgroundColor={item.backgroundColor}
          uniqueKey={item.uniqueKey}
          key={index.toString()}>
          {item.content}
        </Bubble>
      ))}
    </View>
  );
});

export default BubbleMenu;
