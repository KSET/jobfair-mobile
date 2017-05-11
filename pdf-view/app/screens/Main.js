import React, {
  Component
} from 'react';
import {
  View,
} from '@shoutem/ui';

import RNFS from 'react-native-fs';
import PDFView from 'react-native-pdf-view';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pdfLocation = RNFS.DocumentDirectoryPath + '/floor-map.pdf';

    return (
      <View styleName="flexible">
        <PDFView
          ref={(pdf)=>{this.pdfView = pdf;}}
          path={pdfLocation}
          onLoadComplete = {(pageCount)=>{
            this.pdfView.setNativeProps({
                zoom: 1.5
            });
          }}
          style={{ flex: 1}}/>
      </View>
    );
  }
}
