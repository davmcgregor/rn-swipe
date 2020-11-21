import React, { useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
        Animated.spring(
          pan, // Auto-multiplexed
          { toValue: { x: 0, y: 0 }, friction: 6 } // Back to zero
        ).start();
      },
    })
  ).current;

  const getCardStyle = () => {
    const rotate = pan.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    // const color = pan.x.interpolate({
    //   inputRange: [-500, 500],
    //   outputRange: ['rgb(0,0,0)', 'rgb(51,250,170)'],
    // });

    return {
      // backgroundColor: color,
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
