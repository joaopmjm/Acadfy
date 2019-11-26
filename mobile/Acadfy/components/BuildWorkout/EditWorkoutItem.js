import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Picker } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { TextInput } from 'react-native-gesture-handler';



export default class EditWoroutItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseName: this.getName(),
            sets: this.getSets(),
            reps: this.getReps(),
            itemId: this.getItemId()
        }

    }

    save() {
        // patch exercise
        this.props.navigation.navigate('HomeScreen')
    }

    deleteExercise() {
        // delete exercise
        this.props.navigation.navigate('HomeScreen')
    }

    getItemId() {
        return this.props.navigation.getParam('itemId')
    }

    getName() {
        return this.props.navigation.getParam('content').name
    }

    getSets() {
        return this.props.navigation.getParam('content').sets
    }

    getReps() {
        return this.props.navigation.getParam('content').reps
    }

    render() {
        return (
            <View style={styles.page}>
                <View style={{ marginHorizontal: 15 }}>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.exerciseName}
                        onChangeText={text => this.setState({ exerciseName: text })}
                        placeholder='Nome do exercício'
                        placeholderTextColor='gray'

                    />
                    <TextInput
                        style={styles.textInput}
                        value={this.state.sets}
                        onChangeText={text => this.setState({ sets: text })}
                        placeholder='Número de séries'
                        placeholderTextColor='gray'
                        selectTextOnFocus
                        keyboardType={'numeric'}
                    />
                    <TextInput
                        style={styles.textInput}
                        value={this.state.reps}
                        onChangeText={text => this.setState({ reps: text })}
                        placeholder='Número de repetições'
                        placeholderTextColor='gray'
                        keyboardType={'numeric'}
                        selectTextOnFocus
                    />
                    <View style={styles.container}>
                        <Button title="Salvar"
                            buttonStyle={{ backgroundColor: '#0174DF', borderRadius: 20, width: 150, marginHorizontal: 10,  marginTop: 20 }}
                            onPress={() => this.save()}
                        />
                        <Button title="Excluir Exercício"
                            buttonStyle={{ backgroundColor: '#d40000', borderRadius: 20, width: 150, marginHorizontal: 10, marginTop: 20 }}
                            onPress={() => this.deleteExercise()}
                        />
                    </View>
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

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },

    textInput: {
        color: 'white',
        marginTop: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    }
});