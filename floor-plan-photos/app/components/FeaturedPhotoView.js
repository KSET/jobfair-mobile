import React from 'react';
import {
    TouchableOpacity,
    Title,
    Caption,
    View,
    Tile,
    Image,
    Divider,
} from '@shoutem/ui';

/**
 * A component used to render featured news photos
 */
export default class FeaturedPhotoView extends React.Component {
    static propTypes = {
        onPress: React.PropTypes.func,
        photo: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.onPress(this.props.photo);
    }

    render() {
        const { photo } = this.props;

        /* eslint-disable no-multi-spaces */
        return (
            <View key={photo.id}>
                <TouchableOpacity onPress={this.onPress}>
                    <View styleName="sm-gutter featured" style={{ backgroundColor: '#cccccc' }}>
                        <Image
                            styleName="featured"
                            source={photo.source}
                        />
                    </View>
                    <Divider styleName="line" />
                </TouchableOpacity>
            </View>
        );
    }
}
