import React from 'react';
import { connectStyle } from '@shoutem/theme';
import { Linking } from 'react-native';
import {
  ScrollView,
  Screen,
  Button,
  Text,
  Title,
  Caption,
  Icon,
  Image,
  Tile,
  RichMedia,
  View,
} from '@shoutem/ui';
import { NavigationBar } from '@shoutem/ui/navigation';

import * as _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { openURL as openUrlAction } from 'shoutem.web-view';

import { ext } from '../const';
import NextArticle from '../components/NextArticle';

class ArticleDetailsScreen extends React.Component {
  static propTypes = {
    // The news article to display
    article: React.PropTypes.object.isRequired,
    // News articles collection being displayed
    articles: React.PropTypes.array,
    // The next article, if this article is defined, the
    // up next view will be displayed on this screen
    nextArticle: React.PropTypes.object,
    // A function that will open the given article, this
    // function is required to show the up next view
    openArticle: React.PropTypes.func,
    openURL: React.PropTypes.func,
  };

  renderUpNext() {
    const { nextArticle, openArticle } = this.props;
    if (nextArticle && openArticle) {
      return (
        <NextArticle article={nextArticle} openArticle={openArticle} />
      );
    }

    return null;
  }

  render() {
    const { article } = this.props;

    return (
      <Screen styleName="full-screen paper">
        <NavigationBar
          styleName="clear"
          animationName="solidify"
          share={{
            title: article.title,
            text: article.summary,
            link: article.link,
          }}
        />
        <ScrollView>
          <Image
            styleName="large-portrait"
            source={{ uri: _.get(article, 'image.url') }}
            animationName="hero"
          >
            <Tile animationName="hero">
              <Title styleName="centered">{article.title.toUpperCase()}</Title>
            </Tile>
            <Icon name="down-arrow" styleName="scroll-indicator" />
          </Image>
          <View styleName="solid">
            <RichMedia
              body={article.body}
              attachments={article.attachments}
            />
          </View>
          <View styleName="solid">
            <Title>INDUSTRY</Title>
            <Text>
              {article.industry}
            </Text>
          </View>
          <View styleName="solid">
            <Title>STUDENT PROFILE</Title>
            <Text>
              {article.studentProfile}
            </Text>
          </View>
          <View styleName="solid">
            <Title>OPENINGS</Title>
            <Text>
              {article.openings}
            </Text>
          </View>
          <View>
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
        <Button onPress={() => openURL(article.webUrl)}>
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
  connectStyle(ext('ArticleDetailsScreen'))(ArticleDetailsScreen)
);
