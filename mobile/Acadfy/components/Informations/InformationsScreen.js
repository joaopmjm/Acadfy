import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


class InformationScreen extends React.Component {
    render() {
        return (
            <View style={styles.title}>
                <Text style={{ color: "white" }}>InformationScreen</Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    title: {
        flex: 1, 
        alignItems: 'center', 
        backgroundColor: "#2E2E2E"
    }
})
export default InformationScreen;