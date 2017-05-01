import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { mapXMLString } from '../assets/map';

export default class Image extends Component {
  render() {
    // Bug with static SVG file on Android in release mode,
    // so using XML string to load the image.
    return (
      <View style={styles.container}>
        <SvgUri
          width="200"
          height="200"
          svgXmlData={mapXMLString}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
