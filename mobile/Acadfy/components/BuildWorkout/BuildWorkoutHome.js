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
                A: {
                    'Supino reto': '3x10',
                    'Supino inclinado': '3x20',
                    'Leg Press': '3x10',
                    'Stiff': '3x10',
                    'Levantamento Terra': '10x5',
                },
                B: {
                    'Agachamento livre': '3x10',
                    'Avanço livre': '3x20',
                    'Levantamento Terra': '3x10',
                    'Remada fechada': '5x10',
                    'Elevação lateral': '3x10',
                }
            },
            currentStudent: 'Nicolas',
            currentWorkoutCode: 'A'
        }
    }


    loadAll() {
        this.loadStudents();
        this.loadWorkouts();
    }

    layoutDidLoaded() {
        this.loadStudents();
        this.loadWorkouts();
        // this.props.navigation.addListener('willFocus', this.loadWorkouts);
    }

    loadStudents() {
        // get students
        this.setState({ students: ['Nicolas', 'Gustavo'] });
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
                A: {
                    'Supino reto': Math.random(),
                    'Supino inclinado': '3x5',
                    'Leg Press': '3x10',
                    'Stiff': '3x10',
                    'Levantamento Terra': '10x5',
                },
                B: {
                    'Agachamento livre': '3x10',
                    'Avanço livre': '3x20',
                    'Levantamento Terra': '3x10',
                    'Remada fechada': '5x10',
                    'Elevação lateral': '3x10',
                }
            }
        });
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
                            <Text style={{ color: 'white', fontSize: 15 }}>Escolha um treino</Text>
                            <Picker
                                selectedValue={this.state.currentWorkoutCode}
                                style={styles.picker}
                                onValueChange={(itemValue, _) => this.setState({ currentWorkoutCode: itemValue })}>

                                {Object.keys(this.state.workouts).map((w) => (<Picker.Item label={w} value={w} />))}

                            </Picker>
                        </View>
                    </View>
                    <View style={styles.exercises}>
                        {
                            Object.keys(this.state.workouts[this.state.currentWorkoutCode]).map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l}
                                    subtitle={this.state.workouts[this.state.currentWorkoutCode][l] + ' repetições'}
                                    titleStyle={{ color: "white" }}
                                    subtitleStyle={{ color: "white" }}
                                    containerStyle={{ backgroundColor: "#2E2E2E" }}
                                    onPress={() => this.props.navigation.navigate('EditItemScreen')}
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