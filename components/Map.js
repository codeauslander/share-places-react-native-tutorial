import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const Map = props => {
  let Marker = null;
  if (props.userLocation) {
    console.log(props.userLocation);
    Marker = <MapView.Marker coordinate={props.userLocation} />;
  }

  const Markers = props.userLocations.map( place => <MapView.Marker key={place.id} coordinate={place} />);
  console.log(Markers);
  return (
    <View style={styles.mapContainer}>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0421,
        }}
        region={props.userLocation}
      >
        {Marker}
        {Markers}
      </MapView>
    </View>
  );
};

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