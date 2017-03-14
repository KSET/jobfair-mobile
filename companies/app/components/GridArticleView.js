import React from 'react';
import _ from 'lodash';
import {
  TouchableOpacity,
  Subtitle,
  Caption,
  Card,
  View,
  Image,
} from '@shoutem/ui';
import moment from 'moment';

/**
 * A component used to render a single grid article item
 */
export default class GridArticleView extends React.Component {
  static propTypes = {
    onPress: React.PropTypes.func,
    article: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.article);
  }

  render() {
    const { article } = this.props;

    return (
      <TouchableOpacity key={article.id} onPress={this.onPress}>
        <Card styleName="flexible">
          <Image
            styleName="medium-wide"
            source={{ uri: _.get(article, 'image.url') }}
            defaultSource={require('../assets/images/image-fallback.png')}
          />
          <View styleName="flexible content">
            <Subtitle numberOfLines={3} styleName="lg-gutter-bottom">{article.title}</Subtitle>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}
