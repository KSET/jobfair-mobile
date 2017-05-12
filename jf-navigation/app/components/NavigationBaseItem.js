import React from 'react';
import _ from 'lodash';
import { resolveIconSource } from 'shoutem.theme';
import { Text, Image } from '@shoutem/ui';

const missingIconSource = require('../assets/images/missing_icon.png');
const NEWS_IMAGE = require("../assets/images/news.png");
const ABOUT_IMAGE = require("../assets/images/about.png");
const COMPANIES_IMAGE = require("../assets/images/companies.png");
const PRESENTATIONS_IMAGE = require("../assets/images/presentations.png");
const FLOOR_IMAGE = require("../assets/images/floor-plan.png");

export class NavigationBaseItem extends React.Component {
  static propTypes = {
    shortcut: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
    showText: React.PropTypes.bool,
    showIcon: React.PropTypes.bool,
    showBackground: React.PropTypes.bool,
    iconSize: React.PropTypes.string,
    onPress: React.PropTypes.func,
    selected: React.PropTypes.bool,
  };

  static defaultProps = {
    showIcon: true,
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.shortcut);
  }

  getShortcutLayoutSettings(layoutName, props = this.props) {
    const { shortcut } = props;
    return _.get(shortcut, ['settings', 'navigation', layoutName], {});
  }

  resolveIconProps() {
    const { style, shortcut } = this.props;

    const source = shortcut.icon ? this.resolveIcon(shortcut) : missingIconSource;

    return {
      style: style.icon,
      source,
    };
  }

  resolveIcon(shortcut)  {
    let source = null;
    try {
      switch (shortcut.canonicalName) {
        case 'morrigan.rss-news.news-shortcut': {
          source = NEWS_IMAGE;
        } break;
        case 'morrigan.presentations.events-shortcut': {
          source = PRESENTATIONS_IMAGE;
        } break;
        case 'morrigan.companies.news-shortcut': {
          source = COMPANIES_IMAGE;
        } break;
        case 'morrigan.floor-plan-photos.photos-shortcut': {
          source = FLOOR_IMAGE;
        } break;
        case 'morrigan.about.openAbout': {
          source = ABOUT_IMAGE;
        } break;
        default: {
          source = resolveIconSource(shortcut.icon);
        }
      }
    } catch (error) {
      source = resolveIconSource(shortcut.icon);
    }
    return source;
  }

  resolveTextProps() {
    const { style } = this.props;
    return {
      style: style.text,
      numberOfLines: 1,
      styleName: 'center regular',
    };
  }

  renderIcon() {
    const { showIcon } = this.props;

    if (!showIcon) {
      return null;
    }

    return <Image {...this.resolveIconProps()} />;
  }

  renderText() {
    const { shortcut, showText } = this.props;
    if (!showText) {
      return null;
    }
    return (
      <Text {...this.resolveTextProps()}>
       {shortcut.title}
      </Text>
    );
  }
}
