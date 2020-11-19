import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import Deck from './src/Deck';

const DATA = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'https://placeimg.com/640/480/any',
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'https://placeimg.com/640/480/any',
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'https://placeimg.com/640/480/any',
  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'https://placeimg.com/640/480/any',
  },
  {
    id: 5,
    text: 'Card #5',
    uri: 'https://placeimg.com/640/480/any',
  },
  {
    id: 6,
    text: 'Card #6',
    uri: 'https://placeimg.com/640/480/any',
  },
  {
    id: 7,
    text: 'Card #7',
    uri: 'https://placeimg.com/640/480/any',
  },
  {
    id: 8,
    text: 'Card #8',
    uri: 'https://placeimg.com/640/480/any',
  },
];

const App = () => {
  const renderCard = (item) => {
    return (
      <Card key={item.id}>
        <Card.Title h3>{item.text}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: item.uri }} />
        <Text style={{ marginVertical: 10 }}>
          I can customise the card further
        </Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title='VIEW NOW'
        />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Deck data={DATA} renderCard={renderCard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
