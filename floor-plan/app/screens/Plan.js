import React, {
  Component
} from 'react';

import { WebView } from 'react-native';

export default class Plan extends Component {

    static propTypes = {
        location: React.PropTypes.string
    };

  onNavigationStateChange(navState) {
      console.log(navState.title);
  }

  render() {
    const { location } = this.props;
    const javascript = `
    
    function init() {
        var location = window.location.hash.substr(1).toUpperCase();
        var target = document.getElementById(location);
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
        document.getElementById('body').insertAdjacentHTML('beforeend', '<img id="pin" class="bounce" src="./pin.png" style="width:auto;height:auto;position:absolute; left:' + (x - offsetX) + 'px; top:' + (y - offsetY) + 'px;" />');
        window.scrollTo(x - offsetX - window.innerWidth/2, y - offsetY - window.innerHeight/2);
    }

    function toggleCompany(target) {
        if (document.getElementById('pin')) {
            document.getElementById('pin').remove();
        }
        putPin(target);
        document.getElementById('footer').innerHTML = '<h1>' + target.getAttribute('data-company') + '</h1>';
    }
    
    function resolve(e) {
        toggleCompany(e.target);
    }
    
    function focus(e) {
        var pin = document.getElementById('pin');
        window.scrollTo(pin.style.left - window.innerWidth/2, pin.style.top - window.innerHeight/2);
    }
    

    var areas = document.querySelectorAll('area');
    for (var i = 0; i < areas.length; i++) {
        areas[i].addEventListener("click", resolve);
        areas[i].addEventListener("tap", resolve);
    }
    
    document.getElementById('footer').addEventListener("click", focus);
    document.getElementById('footer').addEventListener("tap", focus);
    
    init();

    `;

      return (
        <WebView
            source={{uri:"http://php.marinpetrunic.com/jf/map.html#"+location}}
            injectedJavaScript={javascript}
        />
    );
  }
}