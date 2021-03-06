import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components'
import * as http from '../utils/RequestUtil';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
var Tools = require('../utils/Tools');
var Theme = require('../utils/Theme');

export default class Type extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleData: [],
    };
    this.getTitleList();
  }

  getTitleList() {
    let header = {};
    if (Tools.USER) {
      header = {
        'token': Tools.USER.token,
        'userId': Tools.USER.userId
      };
    }
    http.require('order/category', 'GET', header, null).then((data) => {
      console.warn(JSON.stringify(data));
      this.setState({
        titleData: data.data,
      })
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          renderTabBar={() => (
            <DefaultTabBar tabStyle={styles.tab} textStyle={styles.tabText} />
          )}
          tabBarBackgroundColor={'#ffffff'}
          tabBarActiveTextColor={Theme.Theme.color}
          tabBarInactiveTextColor={'#333333'}
          tabBarTextStyle={{ fontSize: 15 }}
          tabBarPosition={'top'}
          scrollWithoutAnimation={true}
          tabBarUnderlineStyle={styles.tabBarUnderline}
          ref={(tabView) => { this.tabView = tabView; }}
        >

          {
            this.state.titleData.map((data) => {
              return (<Text tabLabel={data.name}>{data.name}</Text>);
            })

          }

        </ScrollableTabView>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  base: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'ios' ? 10 : 0
  },   
  refreshControlBase: {
    backgroundColor: 'transparent'
  },
  tab: {
    paddingBottom: 0
  },
  tabText: {
    fontSize: 16
  },
  tabBarUnderline: {
    backgroundColor: Theme.Theme.color,
    height: 3
  }
});