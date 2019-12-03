import React from 'react';
import { AsyncStorage } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';


import Register from './components/Register/Register';
import InfoAdminScreen from './components/InfoAdmin/InfoAdminScreen';
import HomeScreen from './components/Home/HomeScreen';
import DoubtScreen from './components/Doubts/DoubtScreen';
import InformationScreen from './components/Informations/InformationsScreen';
import BuildWorkout from './components/BuildWorkout/BuildWorkout';
import WorkoutDataScreen from './components/WorkoutData/WorkoutDataScreen';
import LoginScreen from './components/Login/LoginScreen';
import { createStackNavigator } from 'react-navigation-stack';


const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
})

const RegisterStack = createStackNavigator({
  Register: {
    screen: Register,
    navigationOptions: {
      header: null
    }
  },
})


const AppNavigatorAdmin = createBottomTabNavigator({
  InfoAdminScreen: {
    screen: InfoAdminScreen,
    navigationOptions: {
      tabBarLabel: 'InfoAdmin',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-information-circle-outline" size={20} color="#0174DF" />
      )
    }
  },
  BuildWorkoutScreen: {
    screen: BuildWorkout,
    navigationOptions: {
      tabBarLabel: 'Build Workout',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-settings" size={20} color="#0174DF" />
      )
    }
  },
},
  {
    initialRouteName: 'InfoAdminScreen',
    tabBarOptions: {
      style: {
        backgroundColor: '#1C1C1C',
      }
    }
  },

)
const AppNavigator = createBottomTabNavigator({
  WorkoutDataScreen: {
    screen: WorkoutDataScreen,
    navigationOptions: {
      tabBarLabel: 'Métricas',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-pie" size={20} color="#0174DF" />
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
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Exercícios',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" size={20} color="#0174DF" />
      )
    },
  },
  InformationScreen: {
    screen: InformationScreen,
    navigationOptions: {
      tabBarLabel: 'Information',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-information-circle-outline" size={20} color="#0174DF" />
      )
    },
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



export default createAppContainer(
  createSwitchNavigator({
    App: AppNavigator,
    AppAdmin: AppNavigatorAdmin,
    Login: LoginStack,
    Register: RegisterStack
  },
    {
      initialRouteName: "Login"
    })
)


