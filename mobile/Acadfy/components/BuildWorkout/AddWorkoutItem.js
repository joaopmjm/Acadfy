import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Picker } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { TextInput } from 'react-native-gesture-handler';



export default class AddWorkoutItem extends React.Component {
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

    render() {
        return (
            <View style={styles.page}>
                <View style={{ marginHorizontal: 15 }}>
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
                        keyboardType={'numeric'}
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.setState({ reps: text })}
                        placeholder='Número de repetições'
                        placeholderTextColor='gray'
                        keyboardType={'numeric'}
                    />
                    <Button title="Salvar"
                        buttonStyle={{ backgroundColor: '#0174DF', borderRadius: 20, marginHorizontal: 100, marginTop: 20 }}
                        onPress={() => this.save()}
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
        fontSize: 15
    },

    textInput: {
        color: 'white',
        marginTop: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    }
});