import React from 'react';
import { connect } from 'react-redux';
import { InteractionManager } from 'react-native';

import { navigateTo } from '@shoutem/core/navigation';
import { connectStyle } from '@shoutem/theme';
import { EmptyStateView, MapView } from '@shoutem/ui-addons';
import {
  View,
  Button,
  Text,
} from '@shoutem/ui';
import { find } from '@shoutem/redux-io';

import { CmsListScreen } from 'shoutem.cms';
import { triggerEvent } from 'shoutem.analytics';

import ListEventView from '../components/ListEventView';
import FeaturedEventView from '../components/FeaturedEventView';
import { addToCalendar } from '../shared/Calendar';
import {
  EVENTS_SCHEME,
  EVENTS_TAG,
  ext,
} from '../const';

function hasFeaturedEvent(events) {
  return events.some(event => event.featured);
}

export class ListScreen extends CmsListScreen {
  static propTypes = {
    ...CmsListScreen.propTypes,
    navigateTo: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.renderRow = this.renderRow.bind(this);
    this.openDetailsScreen = this.openDetailsScreen.bind(this);
    this.addToCalendar = this.addToCalendar.bind(this);
    this.state = {
      ...this.state,
      schema: EVENTS_SCHEME,
      renderCategoriesInline: true,
    };
  }

  componentWillMount() {
    super.componentWillMount();
    //this.props.find('morrigan.companies.articles');
  }

  openDetailsScreen(event) {
    this.props.navigateTo({
      screen: ext('DetailsScreen'),
      title: event.name,
      props: {
        event,
      },
    });
  }

  addToCalendar(event) {
    addToCalendar(event);
    this.props.triggerEvent('Event', 'Add to calendar', { label: event.name });
  }

  renderCategoriesDropDown(styleName) {
    const { data } = this.props;
    let newStyleName = styleName;
    if (hasFeaturedEvent(data)) {
      newStyleName = newStyleName ? `${newStyleName} featured` : 'featured';
    }
    return super.renderCategoriesDropDown(newStyleName);
  }

  getNavBarProps() {
    const { data } = this.props;
    const newNavBarProps = super.getNavBarProps();

    if (hasFeaturedEvent(data)) {
      newNavBarProps.styleName = `${newNavBarProps.styleName || ''} featured`;
    }

    return newNavBarProps;
  }

  renderFeaturedEvent(event) {
    const { categories } = this.props;
    return (
      <FeaturedEventView
        event={event}
        onPress={this.openDetailsScreen}
        action={this.addToCalendar}
        styleName={categories.length > 1 ? 'dimmed' : ''}
      />
    );
  }

  renderEventListItem(event, style = {}) {
    return (
      <ListEventView
        event={event}
        onPress={this.openDetailsScreen}
        action={this.addToCalendar}
        style={style}
      />
    );
  }

  renderRow(event) {
    if (event.featured) {
      return this.renderFeaturedEvent(event);
    }
    return this.renderEventListItem(event);
  }

}

export const mapStateToProps = CmsListScreen.createMapStateToProps(
  (state) => state[ext()][EVENTS_TAG]
);

export const mapDispatchToProps = CmsListScreen.createMapDispatchToProps({
  navigateTo,
  triggerEvent,
  find,
});

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStyle(ext(ListScreen.name))(ListScreen)
);
