import React from 'react';
import { openURL as openUrlAction } from 'shoutem.web-view';
import {
  ScrollView,
  Screen,
  Title,
  Caption,
  Button,
  Text,
  Divider,
  Image,
  Icon,
  Tile,
  RichMedia,
  View,
} from '@shoutem/ui';
import { NavigationBar } from '@shoutem/ui/navigation';
import { connectStyle } from '@shoutem/theme';

import * as _ from 'lodash';
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
          styleName="large-banner"
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

            {this.renderCompanyProp('INDUSTRY', article.industry)}
            {this.renderCompanyProp('STUDENT PROFILE', article.studentProfile)}
            {this.renderCompanyProp('OPENINGS', article.openings)}

            <Divider styleName="section-header">
              <Caption>COMPANY DESCRIPTION</Caption>
            </Divider>
            <RichMedia
              body={article.body}
              attachments={article.attachments}
            />

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
      <View styleName="horizontal flexible">
        <Button styleName="full-width muted" onPress={() => openURL(article.webUrl)}>
          <Icon name="web" />
          <Text>WEBSITE</Text>
        </Button>
        <Button styleName="full-width muted">
          <Icon name="address-full" />
          <Text>BOOTH LOCATION</Text>
        </Button>
      </View>
      );
    }
  }

  renderCompanyProp(propName, prop) {
    if(prop) {
      return (
        <View>
          <Divider styleName="section-header">
            <Caption>{propName}</Caption>
          </Divider>
          <View styleName="md-gutter">
            <Text>{prop}</Text>
          </View>
        </View>
      );
    }
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
  };
};

export const mapDispatchToProps = {
  openURL: openUrlAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStyle(ext('ArticleMediumDetailsScreen'), {})(ArticleMediumDetailsScreen)
);
