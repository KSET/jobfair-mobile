import React from 'react';
import { formatDate, addToCalendar } from '../shared/Calendar';
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
} from '@shoutem/ui';
import { NavigationBar } from '@shoutem/ui/navigation';

export class DetailsScreen extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.addToCalendar = this.addToCalendar.bind(this);
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

  renderInformation(event) {
    return event.description ? (
      <View styleName="solid">
        <Divider styleName="section-header">
          <Caption>INFORMATION</Caption>
        </Divider>
        <RichMedia
          body={event.description}
          attachments={event.attachments}
        />
      </View>
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
          {this.renderInformation(event)}
        </ScrollView>
      </Screen>
    );
  }

  render() {
    return this.renderScreen(true);
  }
}
