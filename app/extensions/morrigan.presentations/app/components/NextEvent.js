import React from 'react';
import {
  TouchableOpacity,
  Subtitle,
  Caption,
  Image,
  View,
} from '@shoutem/ui';
import _ from 'lodash';

/**
 * A component used to render the next article info on
 * the article details screen.
 */
export default class NextEvent extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    openEvent: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    const { event, openEvent } = this.props;
    openEvent(event);
  }

  render() {
    const { event } = this.props;
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Image
          styleName="large-ultra-wide"
          source={{ uri: _.get(event, 'image.url') }}
        >
          <View styleName="fill-parent overlay vertical md-gutter space-between">
            <Caption styleName="bold bright">UP NEXT</Caption>
          </View>
        </Image>
      </TouchableOpacity>
    );
  }
}
