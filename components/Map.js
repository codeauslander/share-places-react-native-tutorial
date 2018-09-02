import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const Map = props => <View style={styles.mapContainer}><MapView style={styles.map}/></View>;

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 200,
  },
  map: {
    width: '100%',
    height: '100%',
  }
});

export default Map;