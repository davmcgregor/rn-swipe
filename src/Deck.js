import React, { useRef } from 'react';
import { View, Animated, StyleSheet, PanResponder } from 'react-native';

const Deck = ({ data, renderCard }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  const renderCards = () => {
    return data.map((item) => renderCard(item));
  };

  return (
    <View>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        {renderCards()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Deck;
