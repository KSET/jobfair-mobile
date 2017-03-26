import React, {
  Component
} from 'react';

import { WebView } from 'react-native';

export default class Plan extends Component {
  onNavigationStateChange(navState) {
      console.log(navState.title);
  }

  render() {
    const javascript = `
    function putPin(e) {
        var offsetY = 48;
        var offsetX = 24;
        var coords = e.target.coords.split(',');
        var x = (Number(coords[0]) + Number(coords[2])) / 2 + 7;
        var y = (Number(coords[1]) + Number(coords[3])) / 2 + 5;
        document.getElementById('container').insertAdjacentHTML('beforeend', '<img id="pin" src="./pin.png" style="width:auto;height:auto;position:absolute; left:' + (x - offsetX) + 'px; top:' + (y - offsetY) + 'px;" />');
    }

    function resolve(e) {
        if (document.getElementById('pin')) {
            document.getElementById('pin').remove();
        }
        putPin(e);
    }
    
    var areas = document.querySelectorAll('area');
    for (var i = 0; i < areas.length; i++) {
        areas[i].addEventListener("click", resolve);
        areas[i].addEventListener("tap", resolve);
    }
    `;

      return (
        <WebView
            source={require('../assets/map.html')}
            injectedJavaScript={javascript}
        />
    );
  }
}