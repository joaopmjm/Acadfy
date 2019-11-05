import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.page}>
                <Text style={styles.title}>Treinos</Text>
                <Calendar/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#2E2E2E"
    },
    title: {
        color: "white",
        fontSize: 25,
        marginTop: 20,
        marginBottom: 30
    }
})
export default HomeScreen;