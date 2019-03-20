import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Deck from './src/components/Deck';
import {Card,Button,Icon} from 'react-native-elements';

const DATA = [
  { key: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { key: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { key: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { key: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { key: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { key: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { key: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { key: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];




export default class App extends React.Component {
  renderCard=(item)=>{
    return (
      <Card
        title={item.text}
        key={item.key}
        image={{uri:item.uri}}
      >
        <Text style={{marginBottom: 10}}>
          The idea with React Native Elements is more about component structure than actual design.
        </Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' />
       </Card>
    )
  }

  renderNoMoreCards(){
    return (
      <View style={{marginTop:15}}>
        <Card
       title="No More Content Here!" 
      >
      <Button
        backgroundColor = '#03A9F4'
        buttonStyle={{borderRadius:0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        title="Load More"
      />

      </Card>
      </View>
    )
  }

  render() {
    return (
      <View>
        <Deck data={DATA} renderCard={this.renderCard} renderNoMoreCards={this.renderNoMoreCards}/>
      </View>
    );
  }
}
