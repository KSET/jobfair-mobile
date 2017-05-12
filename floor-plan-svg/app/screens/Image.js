import React from 'react';
import {
  View
} from '@shoutem/ui';
import SvgUri from 'react-native-svg-uri';
import { mapXMLString } from '../assets/map';

export default class Image extends React.Component {
  render() {
    // Bug with static SVG file on Android in release mode,
    // so using XML string to load the image.
    return (
      <View>
        <SvgUri
          width="200"
          height="200"
          svgXmlData={mapXMLString}
        />
      </View>
    );
  }
}

