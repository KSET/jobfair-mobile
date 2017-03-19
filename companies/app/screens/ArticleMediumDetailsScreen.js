import React from 'react';
import { connectStyle } from '@shoutem/theme';
import { Linking } from 'react-native';
import { openURL as openUrlAction } from 'shoutem.web-view';
import {
  ScrollView,
  Screen,
  Title,
  Caption,
  Button,
  Text,
  Image,
  Tile,
  RichMedia,
  View,
} from '@shoutem/ui';
import { NavigationBar } from '@shoutem/ui/navigation';

import * as _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';

import { ext } from '../const';
import NextArticle from '../components/NextArticle';

class ArticleMediumDetailsScreen extends React.Component {
  static propTypes = {
    article: React.PropTypes.object.isRequired,
    articles: React.PropTypes.array,
    nextArticle: React.PropTypes.object,
    openArticle: React.PropTypes.func,
    openURL: React.PropTypes.func,
  };

  getNavBarProps() {
    const { article } = this.props;
    const styleName = article.image ? 'clear' : undefined;
    const animationName = article.image ? 'solidify' : 'boxing';

    return {
      styleName,
      animationName,
      share: {
        title: article.title,
        text: article.summary,
        link: article.link,
      },
      title: article.title,
    };
  }

  renderUpNext() {
    const { nextArticle, openArticle } = this.props;
    if (nextArticle && openArticle) {
      return (
        <NextArticle article={nextArticle} openArticle={openArticle} />
      );
    }

    return null;
  }

  renderImage() {
    const { article } = this.props;

    if (article.image) {
      return (
        <Image
          styleName="large"
          source={{ uri: _.get(article, 'image.url') }}
          animationName="hero"
        />
      );
    }
    return null;
  }

  render() {
    const { article } = this.props;
    const screenStyle = article.image ? 'full-screen paper' : 'paper';

    return (
      <Screen styleName={screenStyle}>
        <NavigationBar {...this.getNavBarProps()} />
        <ScrollView>
          {this.renderImage()}

          <View styleName="solid">
            <Tile styleName="text-centric md-gutter-bottom">
              <Title>{article.title.toUpperCase()}</Title>

              <View styleName="horizontal md-gutter-top"/>
            </Tile>

            <RichMedia
              body={article.body}
              attachments={article.attachments}
            />
            <View styleName="solid">
              <Title styleName="text-centric md-gutter-bottom">INDUSTRY</Title>
              <Text>
                {article.industry}
              </Text>
            </View>
            <View styleName="solid">
              <Title styleName="text-centric md-gutter-bottom">STUDENT PROFILE</Title>
              <Text>
                {article.studentProfile}
              </Text>
            </View>
            <View styleName="solid">
              <Title styleName="text-centric md-gutter-bottom">OPENINGS</Title>
              <Text>
                {article.openings}
              </Text>
            </View>
            {this.renderWebsiteButton(article)}
            {this.renderUpNext()}
          </View>
        </ScrollView>
      </Screen>
    );
  }

  renderWebsiteButton(article) {
    const { openURL } = this.props;

    if(article.webUrl) {
      return(
        <Button onPress={() => Linking.openURL(article.webUrl)}>
          <Text>WEBSITE</Text>
        </Button>
      );
    }
  }
}

export const mapStateToProps = (state, ownProps) => {

};

export const mapDispatchToProps = {
  openURL: openUrlAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStyle(ext('ArticleMediumDetailsScreen'))(ArticleMediumDetailsScreen)
);
