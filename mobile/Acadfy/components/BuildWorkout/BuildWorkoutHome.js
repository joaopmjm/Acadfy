import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Picker } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';



export default class BuildWorkoutHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: ['Nicolas', 'Gabriel'],
            workouts: {
                Seg: {
                    '1': {
                        name: 'Supino reto',
                        sets: '3',
                        reps: '15'
                    },
                    '2': {
                        name: 'Supino inclinado',
                        sets: '3',
                        reps: '15'
                    },
                    '3': {
                        name: 'Crucifixo invertido',
                        sets: '3',
                        reps: '15'
                    },
                    '4': {
                        name: 'Crucifixo inferior',
                        sets: '3',
                        reps: '15'
                    },
                    '5': {
                        name: 'Elevação lateral',
                        sets: '3',
                        reps: '15'
                    },
                    
                },
            },
            currentStudent: 'Nicolas',
            weekday: 'Seg'
        }
    }

    layoutDidLoaded() {
        this.loadStudents();
        this.loadWorkouts();
    }

    loadStudents() {
        // get students
        this.setState({ students: ['Roberto'] });
    }

    changeStudent(newStudent) {
        this.setState({ currentStudent: newStudent });
        // get workouts
        this.loadWorkouts();
    }

    loadWorkouts() {
        // get workouts
        this.setState({
            workouts: {
                Seg: {
                    '1': {
                        name: 'Supino reto',
                        sets: '3',
                        reps: '15'
                    },
                    '2': {
                        name: 'Supino inclinado',
                        sets: '3',
                        reps: '15'
                    },
                    '3': {
                        name: 'Crucifixo invertido',
                        sets: '3',
                        reps: '15'
                    },
                    '4': {
                        name: 'Crucifixo inferior',
                        sets: '3',
                        reps: '15'
                    },
                    '5': {
                        name: 'Elevação lateral',
                        sets: '3',
                        reps: '15'
                    },
                    
                },
                Ter: {
                    '1': {
                        name: 'Leg Press',
                        sets: '3',
                        reps: '15'
                    },
                    '2': {
                        name: 'Leg Curl',
                        sets: '3',
                        reps: '15'
                    },
                    '3': {
                        name: 'Levantamento terra',
                        sets: '3',
                        reps: '15'
                    },
                    '4': {
                        name: 'Leg extension',
                        sets: '3',
                        reps: '15'
                    },
                    '4': {
                        name: 'Agachamento livre',
                        sets: '3',
                        reps: '15'
                    }
                },
                Qua: {
                    '1': {
                        name: '15 min esteira',
                        sets: '1',
                        reps: '1'
                    },
                    '2': {
                        name: '25 min escada',
                        sets: '1',
                        reps: '1'
                    }
                },
                Qui: {
                    '1': {
                        name: 'Supino reto',
                        sets: '3',
                        reps: '10'
                    },
                    '2': {
                        name: 'Supino inclinado',
                        sets: '3',
                        reps: '20'
                    }
                },
                Sex: {
                    '1': {
                        name: 'Supino reto',
                        sets: '3',
                        reps: '10'
                    },
                    '2': {
                        name: 'Supino inclinado',
                        sets: '3',
                        reps: '20'
                    }
                },
                Sab: {
                    '1': {
                        name: 'Supino reto',
                        sets: '3',
                        reps: '10'
                    },
                    '2': {
                        name: 'Supino inclinado',
                        sets: '3',
                        reps: '20'
                    }
                },
                Dom: {
                    '1': {
                        name: 'Supino reto',
                        sets: '3',
                        reps: '10'
                    },
                    '2': {
                        name: 'Supino inclinado',
                        sets: '3',
                        reps: '20'
                    }
                },
            }
        });
    }

    getWorkout() {
        return this.state.workouts[this.state.weekday]
    }

    render() {
        return (
            <View style={styles.page} onLayout={() => this.layoutDidLoaded()}>
                <ScrollView style={{ marginHorizontal: 20 }}>
                    <Text style={styles.title}>Montar Treino</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginHorizontal: 15 }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>Escolha um aluno</Text>
                            <Picker
                                selectedValue={this.state.currentStudent}
                                style={styles.picker}
                                onValueChange={(itemValue, _) => this.changeStudent(itemValue)}>

                                {this.state.students.map((s) => (<Picker.Item label={s} value={s} />))}

                            </Picker>
                        </View>
                        <View>
                            <Text style={{ color: 'white', fontSize: 15 }}>Escolha um dia da semana</Text>
                            <Picker
                                selectedValue={this.state.weekday}
                                style={styles.picker}
                                onValueChange={(itemValue, _) => this.setState({ weekday: itemValue })}>

                                {Object.keys(this.state.workouts).map((w) => (<Picker.Item label={w} value={w} />))}

                            </Picker>
                        </View>
                    </View>
                    <View style={styles.exercises}>
                        {
                            Object.keys(this.getWorkout()).map((itemId, i) => (
                                <ListItem
                                    key={i}
                                    title={this.getWorkout()[itemId].name}
                                    subtitle={this.getWorkout()[itemId].sets.toString() + 'x' 
                                        + this.getWorkout()[itemId].reps.toString() + ' repetições'}
                                    titleStyle={{ color: "white" }}
                                    subtitleStyle={{ color: "white" }}
                                    containerStyle={{ backgroundColor: "#2E2E2E" }}
                                    onPress={() => this.props.navigation.navigate('EditItemScreen', { 'itemId': itemId, content: this.getWorkout()[itemId] })}
                                    bottomDivider
                                />
                            ))
                        }
                    </View>
                    <View style={styles.end}>
                        <Button
                            title="Adicionar Exercício"
                            buttonStyle={{ backgroundColor: '#0174DF', borderRadius: 20, marginHorizontal: 50 }}
                            onPress={() => this.props.navigation.navigate('AddItemScreen')}
                        />
                    </View>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    page: {
        height: '100%',
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
        color: 'white',
    }
})