import React from 'react';
import {StyleSheet, Button} from 'react-native';

const Location = props => <Button title='Get Location' onPress={props.getLocation}/>;

export default Location;