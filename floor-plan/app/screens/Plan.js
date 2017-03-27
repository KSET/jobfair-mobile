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
    
    window.onload = function() {
        var location = window.location.hash.substr(1).toUpperCase();
        var target = document.querySelectorAll('[data-id="'+location+'"]')[0];
        if(target) {
            toggleCompany(target);
        }
    };

    window.onhashchange = function() {
        var location = window.location.hash.substr(1).toUpperCase();
        var target = document.querySelectorAll('[data-id="'+location+'"]')[0];
        if(target) {
            toggleCompany(target);
        }
    };

    function putPin(target) {
        var offsetY = 48;
        var offsetX = 24;
        var coords = target.coords.split(',');
        var x = (Number(coords[0]) + Number(coords[2])) / 2 + 7;
        var y = (Number(coords[1]) + Number(coords[3])) / 2 + 5;
        document.getElementById('container').insertAdjacentHTML('beforeend', '<img id="pin" src="./pin.png" style="width:auto;height:auto;position:absolute; left:' + (x - offsetX) + 'px; top:' + (y - offsetY) + 'px;" />');
    }

    function toggleCompany(target) {
        if (document.getElementById('pin')) {
            document.getElementById('pin').remove();
        }
        putPin(target);
        console.log(target.getAttribute('data-id'));
        document.getElementById('footer').innerHTML = '<h1>' + target.getAttribute('data-id') + ' - ' + target.getAttribute('data-company') + '</h1>';
        document.getElementById('pin').scrollIntoView();
    }
    function resolve(e) {
        toggleCompany(e.target);
    }

    var areas = document.querySelectorAll('area');
    for (var i = 0; i < areas.length; i++) {
        areas[i].addEventListener("click", resolve);
        areas[i].addEventListener("tap", resolve);
    }
    `;

      return (
        <WebView
            source={{uri:"http://php.marinpetrunic.com/jf/map.html#b16"}}
            injectedJavaScript={javascript}
        />
    );
  }
}