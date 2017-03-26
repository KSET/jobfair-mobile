// Reference for app/index.js can be found here:
// http://shoutem.github.io/docs/extensions/reference/extension-exports

import * as extension from './extension.js';

/*
// Should be some fix for rendering html in webview but I am not sure if we still need it


import { Platform } from 'react-native';
import { setCustomSourceTransformer } from 'react-native/Libraries/Image/resolveAssetSource';

setCustomSourceTransformer(function (resolver) {

    if (Platform.OS === 'android'
        && !resolver.serverUrl
        && !resolver.bundlePath
        && resolver.asset.type === 'html') {
        resolver.bundlePath = '/android_asset/';
    }

    return resolver.defaultAsset();
});*/

export const screens = extension.screens;
