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

  const getCardStyle = () => {
    const rotate = pan.x.interpolate({
      inputRange: [-500, 0, 500],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
    };
  };

  const renderCards = () => {
    return data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={getCardStyle()}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }
      return renderCard(item);
    });
  };

  return (
    <View>
      <View>{renderCards()}</View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Deck;
