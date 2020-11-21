import React, { useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.5 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = ({ data, renderCard }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH * 1.1 : -SCREEN_WIDTH * 1.1;
    Animated.timing(pan, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction) => {
    const { onSwipeLeft, onSwipeRight } = this.props;
    
    direction === 'right' ? onSwipeRight() : onSwipeLeft();
  };

  const resetPosition = () => {
    Animated.spring(
      pan, // Auto-multiplexed
      { toValue: { x: 0, y: 0 }, friction: 6, useNativeDriver: true } // Back to zero
    ).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(evt, gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const getCardStyle = () => {
    const rotate = pan.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
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
