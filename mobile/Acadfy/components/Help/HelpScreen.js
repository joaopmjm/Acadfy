import React from 'react';
import {Text, View} from 'react-native';


class HelpScreen extends React.Component{
    render(){
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#2E2E2E"}}>
                <Text style={{color: "white", fontSize: 50,}}>Configuration</Text>
            </View>

        );
    }
}

export default HelpScreen;