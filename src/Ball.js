import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';

const Ball = () => {
  const [position, setPosition] = useState(new Animated.ValueXY(0, 0));

  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 200, y: 500 },
    }).start();
  }, []);

  return (
    <Animated.View style={position.getLayout()}>
      <View style={styles.ball}></View>
      <Text>Hi</Text>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black',
  },
});

export default Ball;
