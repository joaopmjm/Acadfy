import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Picker } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';



export default class BuildWorkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            A: ["Supino reto", "Supino inclinado", "Leg Press", "Stiff", "Levantamento Terra"],
            B: ["Agachamento livre", "Avanço livre", "Levantamento Terra", "Remada fechada", "Elevação lateral"],
            C: ["Exercício 1", "Exercício 2", "Exercício 3", "Exercício 4"],
            currentStudent: 'Nicolas',
            currentWorkoutCode: 'A'
        }

    }

    changeStudent() {
        // call API
    }

    finishExercise() {
        //call API to finish exercise
    }

    render() {
        return (
            <View style={styles.page}>
                <ScrollView>
                    <Text style={styles.title}>Montar Treino</Text>
                    <Picker
                        selectedValue={this.state.currentStudent}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ currentStudent: itemValue })
                        }>
                        <Picker.Item label="Nicolas" value="Nicolas" />
                        <Picker.Item label="Gabriel" value="Gabriel" />
                    </Picker>
                    <Picker
                        selectedValue={this.state.currentWorkoutCode}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ currentWorkoutCode: itemValue })
                        }>
                        <Picker.Item label="A" value="A" />
                        <Picker.Item label="B" value="B" />
                    </Picker>
                    <View style={styles.exercises}>
                        {
                            this.state[this.state.currentWorkoutCode].map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l}
                                    subtitle="3x10 repetições"
                                    titleStyle={{ color: "white" }}
                                    subtitleStyle={{ color: "white" }}
                                    containerStyle={{ backgroundColor: "#2E2E2E" }}
                                    bottomDivider
                                />
                            ))
                        }
                    </View>
                    <View style={styles.end}>
                        <Button title="Adicionar Exercício" buttonStyle={{ backgroundColor: '#0174DF', borderRadius: 20 }} />
                    </View>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        backgroundColor: "#2E2E2E",

    },
    title: {
        color: 'white',
        letterSpacing: 5,
        fontSize: wp('7%'),
        marginTop: hp('2%'),
        marginBottom: hp('7%'),
        alignSelf: 'center',
    },
    date: {
        color: 'white',
        fontSize: wp('7%')
    },
    hrTitle: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.3,
        marginBottom: hp('2%'),
        alignSelf: 'center',
        width: wp('35%'),
    },
    hrDate: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.3,
        marginBottom: hp('2%'),
        alignSelf: 'center',
        width: wp('75%'),
    },
    exercises: {
        marginBottom: hp('5%')

    },
    buttons: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    end: {
        marginBottom: hp('5%'),
    },
    picker: {
        color: 'white'
    }
})