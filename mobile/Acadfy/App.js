import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';


import HomeScreen from './components/Home/HomeScreen';
import ConfigurationScreen from './components/Configuration/ConfigurationScreen';
import InformationScreen from './components/Informations/InformationsScreen';

const AppNavigator = createBottomTabNavigator({
  InformationScreen: {
    screen: InformationScreen,
    navigationOptions: {
      tabBarLabel: 'Information',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-information-circle-outline" size={20} color="#0174DF" />
      )
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" size={20} color="#0174DF" />
      )
    },
  },
  ConfigurationScreen: {
    screen: ConfigurationScreen,
    navigationOptions: {
      tabBarLabel: 'Configuration',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-settings" size={20} color="#0174DF" />
      )
    }
  },
},

  {
    initialRouteName: 'Home',
    tabBarOptions: {
      style: {
        backgroundColor: '#1C1C1C',
      }

    }
  },

);


export default createAppContainer(AppNavigator);
