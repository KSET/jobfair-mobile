import React from 'react';
import _ from 'lodash';

import { connectStyle } from '@shoutem/theme';
import { connect } from 'react-redux';

import {
  ArticlesListScreen,
  mapStateToProps,
  mapDispatchToProps,
} from './ArticlesListScreen';

import { ext } from '../const.js';
import ListArticleView from '../components/ListArticleView';
import FeaturedArticleView from '../components/FeaturedArticleView';

export class ArticlesFeaturedListScreen extends ArticlesListScreen {
  static propTypes = {
    ...ArticlesListScreen.propTypes,
    onPress: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(article) {
    const completeFeed = this.props.feed;
    if (article === _.head(completeFeed)) {
      return (
        <FeaturedArticleView
          article={article}
          onPress={this.openDetailsScreen}
        />
      );
    }

    return (
      <ListArticleView
        article={article}
        onPress={this.openDetailsScreen}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
connectStyle(ext('ArticlesFeaturedListScreen'), {})(ArticlesFeaturedListScreen),
);
