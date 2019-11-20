import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';


import HomeScreen from './components/Home/HomeScreen';
import DoubtScreen from './components/Doubts/DoubtScreen';
import InformationScreen from './components/Informations/InformationsScreen';
import BuildWorkout from './components/BuildWorkout/BuildWorkout';

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
  BuildWorkout: {
    screen: BuildWorkout,
    navigationOptions: {
      tabBarLabel: 'Montar Treino',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-fitness" size={20} color="#0174DF" />
      )
    },
  },
  DoubtScreen: {
    screen: DoubtScreen,
    navigationOptions: {
      tabBarLabel: 'Ajuda',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-help" size={30} color="#0174DF" />
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
