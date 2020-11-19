import React, { useRef } from 'react';
import { View, Animated, StyleSheet, PanResponder } from 'react-native';

const Deck = ({ data, renderCard }) => {
  
  const panResponder = useRef(PanResponder.create({})).current;

  const renderCards = () => {
    return data.map((item) => renderCard(item));
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({});

export default Deck;
