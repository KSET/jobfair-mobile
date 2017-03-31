import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  Image,
  View,
  Tile,
} from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme';
import { navigateTo } from '@shoutem/core/navigation';

import { CmsListScreen } from 'shoutem.cms';

import { ext } from '../const';
import { DetailsScreen } from './DetailsScreen';
import EventImage from '../components/EventImage';

class DetailsScreenWithMediumPhoto extends DetailsScreen {
  renderWithoutPhoto(event) {
    return (
      <Tile styleName="text-centric lg-gutter-top">
        {this.renderHeadlineDetails(event)}
      </Tile>
    );
  }

  renderHeader(event) {
    if (!_.has(event, 'image.url')) {
      return this.renderWithoutPhoto(event);
    }

    return (
      <View>
        <EventImage styleName="large-wide" event={event}>
          <Tile
            styleName="text-centric"
            animationName="hero"
          >
            {this.renderHeadlineDetails(event)}
          </Tile>
        </EventImage>
      </View>
    );
  }

  resolveNavBarProps(options = {}) {
    const { event } = this.props;

    return {
      share: {
        title: event.name,
        text: event.description,
        link: event.rsvpLink,
      },
      styleName: _.has(event, 'image.url') ? 'clear' : 'no-border',
      animationName: _.has(event, 'image.url') ? 'solidify' : '',
      ...options,
    };
  }

  renderScreen() {
    const { event } = this.props;

    if (!_.has(event, 'image.url')) {
      // Do not render in full screen, this layout have NavBar
      return super.renderScreen(false);
    }

    return super.renderScreen(true);
  }
}
export const mapDispatchToProps = CmsListScreen.createMapDispatchToProps({
  navigateTo,
});

export default connect(undefined, mapDispatchToProps)(
  connectStyle(ext(DetailsScreenWithMediumPhoto.name))(DetailsScreenWithMediumPhoto),
);
