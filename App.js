/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import Location from './components/Location';
import Map from './components/Map';

// https://petshareapp-c0f76.firebaseio.com/
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    userLocation: null,
    places: [],
  }
  getLocation = () => {
    navigator.geolocation.getCurrentPosition( position => {

      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0421,
        }
      })

      fetch( 'https://petshareapp-c0f76.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
      .then( res => res.json() )
      .catch( err => console.log(err));

      console.log(position);
    }, err => console.log(err));
  }

  getLocations = () => {
    fetch( 'https://petshareapp-c0f76.firebaseio.com/places.json', {
      method: 'GET',
    })
    .then( res => res.json() )
    .then( parse => {
      const places = [];
      for (const key in parse) {
        places.push({
          latitude: parse[key].latitude,
          longitude: parse[key].longitude,
          id: key,
        })
      }
      this.setState({places: places});
    })
    .catch( err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <View style={{marginBottom: 20}}>
          <Button title='Get all Locations' onPress={this.getLocations}/>
        </View>
        <Location getLocation={this.getLocation} />
        <Map userLocation={this.state.userLocation} userLocations={this.state.places}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
