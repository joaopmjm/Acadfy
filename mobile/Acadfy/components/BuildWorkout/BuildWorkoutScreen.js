import React from 'react';
import {Text, View} from 'react-native';


class ConfigurationScreen extends React.Component{
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#2E2E2E"}}>
                <Text style={{color: "white", fontSize: 50,}}>Build your workout</Text>
            </View>

        );
    }
}

export default ConfigurationScreen;