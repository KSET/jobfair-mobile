import React, {
    Component
} from 'react';

import {WebView} from 'react-native';

export default class Plan extends Component {

    static propTypes = {
        location: React.PropTypes.string
    };

    render() {
        const {location} = this.props;
        return (
            <WebView
                source={{uri: "https://jobfair.fer.unizg.hr/en/floor_plan#" + location + "?navigation=false"}}
            />
        );
    }
}