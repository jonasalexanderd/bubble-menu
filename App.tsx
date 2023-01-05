/**
 * Bubble menu app
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
// Components
import BubbleMenu from './src/components/bubbleMenu';
import bubbleMenuStyle from './src/components/bubbleMenu/style';

const App = () => {
  const bubbleItems = [
    {
      content: (
        <View style={bubbleMenuStyle.content}>
          <Text style={style.textStyle}>yoga</Text>
        </View>
      ),
      defaultSize: 100,
      backgroundColor: '#fb2c73',
      uniqueKey: 'yoga',
    },
    {
      content: (
        <View style={bubbleMenuStyle.content}>
          <Text style={style.textStyle}>meditate</Text>
        </View>
      ),
      defaultSize: 150,
      backgroundColor: '#1376dd',
      uniqueKey: 'meditate',
    },
    {
      content: (
        <View style={bubbleMenuStyle.content}>
          <Text style={style.textStyle}>sleep</Text>
        </View>
      ),
      defaultSize: 200,
      backgroundColor: '#f26020',
      uniqueKey: 'sleep',
    },
    {
      content: (
        <View style={bubbleMenuStyle.content}>
          <Text style={style.textStyle}>calm</Text>
        </View>
      ),
      defaultSize: 135,
      backgroundColor: '#902ae6',
      uniqueKey: 'calm',
    },
    {
      content: (
        <View style={bubbleMenuStyle.content}>
          <Text style={style.textStyle}>focus</Text>
        </View>
      ),
      defaultSize: 80,
      backgroundColor: '#f29104',
      uniqueKey: 'focus',
    },
  ];
  return (
    <View style={style.container}>
      <SafeAreaView />
      <BubbleMenu items={bubbleItems} />
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  textStyle: {
    textTransform: 'lowercase',
    color: '#ffffff',
  },
});
