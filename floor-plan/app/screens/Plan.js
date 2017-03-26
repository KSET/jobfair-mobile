import React, {
  Component
} from 'react';

import { WebView } from 'react-native';

export default class Plan extends Component {
  render() {
    return (
        <WebView
            source={require('../assets/map.html')}
            style={{marginTop: 20}}
        />
    );
  }
}