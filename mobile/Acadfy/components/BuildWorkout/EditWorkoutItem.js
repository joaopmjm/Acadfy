import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Picker } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { TextInput } from 'react-native-gesture-handler';



export default class EditWorkoutItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseName: '',
            sets: '',
            reps: ''
        }

    }

    save() {
        // post
        this.props.navigation.navigate('HomeScreen')
    }

    deleteExercise(i) {
        // post
        this.props.navigation.navigate('HomeScreen')
    }

    render() {
        return (
            <View style={styles.page}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.setState({ exerciseName: text })}
                    placeholder='Nome do exercício'
                    placeholderTextColor='gray'

                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.setState({ sets: text })}
                    placeholder='Número de séries'
                    placeholderTextColor='gray'
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => this.setState({ reps: text })}
                    placeholder='Número de repetições'
                    placeholderTextColor='gray'
                />
                <View style={styles.container}>
                    <Button title="Salvar"
                        buttonStyle={{ backgroundColor: '#0174DF', borderRadius: 20, width:200, marginHorizontal: 3,  marginTop: 20 }}
                        onPress={() => this.save()}
                    />
                    <Button title="Excluir Exercício"
                        buttonStyle={{ backgroundColor: '#d40000', borderRadius: 20, width:200, marginHorizontal: 3, marginTop: 20 }}
                        onPress={() => this.deleteExercise()}
                    />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        height: '100%',
        backgroundColor: "#2E2E2E",

    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    textInput: {
        color: 'white'
    }
});