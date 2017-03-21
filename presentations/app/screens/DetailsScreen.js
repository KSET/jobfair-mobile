import React from 'react';
import { connect } from 'react-redux';

import {
  ScrollView,
  Screen,
  Title,
  Caption,
  Icon,
  Overlay,
  RichMedia,
  Subtitle,
  View,
  Button,
  Text,
  Divider,
  TouchableOpacity,
  Row,
} from '@shoutem/ui';
import { NavigationBar } from '@shoutem/ui/navigation';
import { navigateTo } from '@shoutem/core/navigation';

import { formatDate, addToCalendar } from '../shared/Calendar';

export class DetailsScreen extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
    navigateTo: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.addToCalendar = this.addToCalendar.bind(this);
    this.openCompanyPress = this.openCompanyPress.bind(this);
  }

  resolveNavBarProps(options = {}) {
    const { event } = this.props;

    return {
      share: {
        title: event.name,
        text: event.description,
        link: event.rsvpLink,
      },
      styleName: 'clear',
      animationName: 'solidify',
      ...options,
    };
  }

  addToCalendar() {
    addToCalendar(this.props.event);
  }

  openCompanyPress() {
    const company = this.props.event.relatedLink;

    this.props.navigateTo({
      screen: 'morrigan.companies.ArticleMediumDetailsScreen',
      title: company.title,
      props: {
        article: company,
      },
    });
  }

  renderHeadlineDetails(event, darkened = true) {
    const textColorStyle = darkened ? '' : 'bright';

    return (
      <View virtual>
        <Title styleName={`${textColorStyle} md-gutter-bottom`}>
          {event.name.toUpperCase()}
        </Title>
        <Caption styleName={`${textColorStyle} sm-gutter-bottom`}>
          {formatDate(event.startTime)}
        </Caption>
        <Divider styleName="line small center" />
        <Caption styleName={`${textColorStyle} md-gutter-bottom`}>
          {formatDate(event.endTime)}
        </Caption>
        <Button
          onPress={this.addToCalendar}
          styleName={`${darkened ? 'secondary' : ''} action md-gutter-top`}
        >
          <Icon name="add-event" />
          <Text>Add to calendar</Text>
        </Button>
      </View>
    );
  }

  renderDescription(event) {
    return event.description ? (
      <View styleName="solid">
        <Divider styleName="section-header">
          <Caption>DESCRIPTION</Caption>
        </Divider>
        <RichMedia
          body={event.description}
          attachments={event.attachments}
        />
      </View>
    ) : null;
  }

  renderLecturer(event) {
    return event.lecturer ? (
      <View styleName="solid">
        <Divider styleName="section-header">
          <Caption>LECTURER</Caption>
        </Divider>
        <View styleName="md-gutter">
          <Text>{event.lecturer}</Text>
        </View>
      </View>
    ) : null;
  }

  renderCompanyLink(company) {
    return company ? (
      <TouchableOpacity onPress={this.openCompanyPress}>
        <Row styleName="small">
          <Icon name="users" />
          <View styleName="vertical">
            <Subtitle>Read more about {company.title}</Subtitle>
          </View>
          <Icon styleName="disclosure" name="right-arrow" />
        </Row>
      </TouchableOpacity>
    ) : null;
  }

  renderScreen(fullScreen) {
    const { event } = this.props;
    const screenStyleName = `${fullScreen ? ' full-screen' : ''} paper`;

    return (
      <Screen styleName={screenStyleName}>
        <NavigationBar {...this.resolveNavBarProps()} />
        <ScrollView>
          {this.renderHeader(event)}
          {this.renderDescription(event)}
          {this.renderLecturer(event)}
          {this.renderCompanyLink(event.relatedLink)}
        </ScrollView>
      </Screen>
    );
  }

  render() {
    return this.renderScreen(true);
  }
}

