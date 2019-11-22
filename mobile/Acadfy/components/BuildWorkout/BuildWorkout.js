import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import BuildWorkoutHome from './BuildWorkoutHome';
import AddWorkoutItem from './AddWorkoutItem';
import EditWorkoutItem from './EditWorkoutItem';

export default class BuildWorkout extends React.Component {

    render() {
        return <Navigator />
    }

}

const Navigator = createAppContainer(createStackNavigator(
    {
        HomeScreen: {
            screen: BuildWorkoutHome
        },
        AddItemScreen: {
            screen: AddWorkoutItem
        },
        EditItemScreen: {
            screen: EditWorkoutItem
        }
    },
    {
        defaultNavigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: "#2E2E2E",
            }
        }
    }
));
