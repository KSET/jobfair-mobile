import React, { Component } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  ScreenStack,
  navigateTo,
  navigateBack,
  setActiveNavigationStack,
  NavigationOperations,
} from '@shoutem/core/navigation';
import { connectStyle } from '@shoutem/theme';
import { executeShortcut } from 'shoutem.application';
import DrawerItem from '../components/DrawerItem';
import { ext } from '../const';
import { DRAWER_NAVIGATION_STACK } from '../redux';

import {
  Screen,
  Button,
  Icon,
  View,
} from '@shoutem/ui';

import {
  NavigationBar,
} from '@shoutem/ui/navigation';

import SideMenu from 'react-native-side-menu';
import { shortcutChildrenRequired } from '../helpers';

const { width: windowWidth } = Dimensions.get('window');

export class Drawer extends Component {
  static propTypes = {
    // Server props
    shortcut: React.PropTypes.object.isRequired,
    startingScreen: React.PropTypes.object,
    showText: React.PropTypes.bool,
    showIcon: React.PropTypes.bool,

    // Props from local state (connect)
    navigationState: React.PropTypes.object,
    style: React.PropTypes.object,

    executeShortcut: React.PropTypes.func,
    setActiveNavigationStack: React.PropTypes.func,
    replaceWith: React.PropTypes.func,
    navigateBack: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.drawerItemPressed = this.drawerItemPressed.bind(this);
    this.renderDrawerItem = this.renderDrawerItem.bind(this);
    this.renderMenuButton = this.renderMenuButton.bind(this);
    this.drawerStatusChanged = this.drawerStatusChanged.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.resolveAndUpdateLayoutWidth = this.resolveAndUpdateLayoutWidth.bind(this);

    this.state = {
      layoutWidth: windowWidth,
      activeShortcut: null,
      isOpen: false,
    };
  }

  componentWillMount() {
    this.props.setActiveNavigationStack(DRAWER_NAVIGATION_STACK);

    const activeShortcut = this.getStartingShortcut();
    this.setState({ activeShortcut }, this.openShortcut);
  }

  getStartingShortcut() {
    const { startingScreen, shortcut } = this.props;
    const childShortcuts = shortcut.children;
    return _.find(childShortcuts, startingScreen) || _.first(childShortcuts);
  }

  resolveAndUpdateLayoutWidth({ nativeEvent: { layout: { width } } }) {
    this.setState({ layoutWidth: width });
  }

  calculateSideMenuWidth() {
    // Use theme visibleContentWidth or fallback design default value
    const visibleContentWidth = this.props.style.visibleContentWidth || 54;
    return this.state.layoutWidth - visibleContentWidth;
  }

  openMenu() {
    this.setState({ isOpen: true });
  }

  drawerItemPressed(activeShortcut) {
    this.setState({ activeShortcut, isOpen: !this.state.isOpen }, this.openShortcut);
  }

  drawerStatusChanged(isOpen) {
    this.setState({ isOpen });
  }

  openShortcut() {
    const { activeShortcut } = this.state;

    if (activeShortcut) {
      this.props.executeShortcut(
        activeShortcut.id,
        NavigationOperations.RESET,
        DRAWER_NAVIGATION_STACK
      );
    }
  }

  renderMenuButton(sceneProps) {
    let handlePress = sceneProps.onNavigateBack;
    let iconName = 'back';
    if (sceneProps.scene.index === 0 || !handlePress) {
      handlePress = this.openMenu;
      iconName = 'sidebar';
    }

    return (
      <View virtual styleName="container">
        <Button onPress={handlePress}>
          <Icon
            name={iconName}
            animationName={sceneProps.navBarProps.animationName}
          />
        </Button>
      </View>
    );
  }

  renderMenu(shortcuts, style) {
    return (
      <ScrollView
        style={style.menu}
        alwaysBounceVertical={false}
      >
        <View style={style.menuItems} styleName="flexible">
          {shortcuts.map(this.renderDrawerItem)}
        </View>
      </ScrollView>
    );
  }

  renderDrawerItem(shortcut) {
    const { activeShortcut } = this.state;
    const { showText, showIcon } = this.props;
    return (
      <DrawerItem
        key={`drawer-item-${shortcut.id}`}
        showText={showText}
        showIcon={showIcon}
        shortcut={shortcut}
        onPress={this.drawerItemPressed}
        selected={activeShortcut.id === shortcut.id}
      />
    );
  }

  render() {
    const { isOpen, activeShortcut } = this.state;
    const { shortcut, style } = this.props;

    if (!activeShortcut) {
      return null;
    }

    const menu = this.renderMenu(shortcut.children, style);

    return (
      <Screen styleName="full-screen paper" onLayout={this.resolveAndUpdateLayoutWidth}>
        <NavigationBar
          child
          renderLeftComponent={this.renderMenuButton}
        />
        <SideMenu
          menu={menu}
          isOpen={isOpen}
          openMenuOffset={this.calculateSideMenuWidth()}
          onChange={this.drawerStatusChanged}
        >
          <View styleName="flexible" style={style.underlayScreensWrapper}>
            <ScreenStack
              navigationState={this.props.navigationState}
              onNavigateBack={this.props.navigateBack}
              style={this.props.style.screenStack}
            />
          </View>
        </SideMenu>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({ navigationState: state[ext()].drawer });
const mapDispatchToProps = { navigateTo, navigateBack, setActiveNavigationStack, executeShortcut };

export default shortcutChildrenRequired(
  connect(mapStateToProps, mapDispatchToProps)(connectStyle(ext('Drawer'))(Drawer))
);
