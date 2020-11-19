import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const Deck = ({ data, renderCard }) => {
  const renderCards = () => {
    return data.map((item) => renderCard(item));
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({});

export default Deck;
