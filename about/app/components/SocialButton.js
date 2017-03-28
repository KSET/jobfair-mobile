import React, { Component, PropTypes } from 'react';
import { Linking, Alert } from 'react-native';

import {
  Text,
  Button,
  Icon,
} from '@shoutem/ui';

export default class SocialButton extends Component {
  static propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string.isRequired,
    openURL: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.buttonPressHandle = this.buttonPressHandle.bind(this);
  }

  buttonPressHandle() {
    const { icon, openURL, url, title } = this.props;

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Alert.alert('Info', url, [{ text: 'OK', onPress: () => {} }]);
        Linking.openURL(url);
      } else {
        if (icon === 'call' || icon === 'email') {
          Alert.alert(
            'Error',
            'This action cannot be performed in Preview.',
            [{ text: 'OK', onPress: () => {} }],
          );
        } else {
          openURL(url, title);
        }

      }
    });
  }

  render() {
    const { icon, title, url } = this.props;

    if (!url) {
      return null;
    }

    return (
      <Button styleName="stacked clear tight" onPress={this.buttonPressHandle}>
        <Icon name={icon} />
        <Text>{title}</Text>
      </Button>
    );
  }
}
