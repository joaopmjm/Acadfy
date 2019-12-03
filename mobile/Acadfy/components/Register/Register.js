import React, { Component } from 'react';
import api from '../../services/api';

import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        isRegistred: false,
        menssage: '',
        erro: '',
    };

    validateEmail(email){
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    
        return expression.test(String(email).toLowerCase())
    }

    /*
    validatePassword(password) {
        var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        return paswd.test(password)
    }
    */

    register = async () => {
        const { name, email, password, password2 } = this.state;

        try {
            if (name !== '' && email !== '' && password !== '' && password2 !== '') {

                if (this.validateEmail(email)) {
                
                    //if (this.validatePassword(password)){
                
                        if (password === password2) {
                            const response = await api.post('/auth/register', {
                                name,
                                email,
                                password,
                                height: "100",
                                weight: "100",
                                birthDate: "01/01/1999",
                                trainerId: "5de55f99625bde281a996515",
                            })
        
                            this.setState({ isRegistred: true, menssage: response.data })

                        } else { this.setState({ isRegistred: false, erro: "Senhas não coincidem!" }) }
                    
                    //} else { this.setState({ isRegistred: false, erro: "Senha possui caracteres não aceitos!" }) }
                
                } else { this.setState({ isRegistred: false, erro: "Email digitado não é um email!" }) }

            } else { this.setState({ isRegistred: false, erro: "Há campos não preenchidos!" }) }

        } catch (err) {
            this.setState({ isRegistred: false, erro: "Email ja registrado!" })
            console.log(err);
        }
    }

    render() {
        return (
            <View style={styles.page}>
                <Text style={styles.title}>Cadastro</Text>
                <ScrollView >
                    <Text style={styles.label}>Nome: </Text>
                    <TextInput
                        style={styles.input}
                        type="text"
                        placeholder="Digite seu nome"
                        placeholderTextColor='gray'
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                    />

                    <Text style={styles.label}>Email: </Text>
                    <TextInput
                        style={styles.input}
                        type="text"
                        placeholder="Digite seu email"
                        placeholderTextColor='gray'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />

                    <Text style={styles.label}>Senha: </Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Digite sua Senha"
                        placeholderTextColor='gray'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />

                    <Text style={styles.label}>Confirme sua Senha: </Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Digite sua Senha"
                        placeholderTextColor='gray'
                        value={this.state.password2}
                        onChangeText={password2 => this.setState({ password2 })}
                    />
                
                    <TouchableOpacity style={styles.button} onPress={() => { this.register() }} >
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>

                    <View style={styles.menssageResView}>
                        {this.state.isRegistred ?
                            <Text style={styles.menssageRes}>{
                                Toast.show(this.state.menssage),
                                this.props.navigation.navigate('Login')    
                            }</Text> :
                            <Text style={styles.menssageRes}>{this.state.erro}</Text>}
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('Login') }} >
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
    label: {
        letterSpacing: 5,
        color: 'white',
        fontSize: hp('3%'),
        alignSelf: 'center',
    
    },
    input: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        backgroundColor: '#2E2E2E',
        color: 'gray',
        width: wp('40%'),
        borderRadius: 8,
        marginBottom: 30,
        alignSelf: 'center',
        textAlign: 'center'
    },
    button: {
        marginTop: hp('1%'),

        height: 45,
        width: wp('40%'),
        borderRadius: 20,
        backgroundColor: '#069',

        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: wp('4%'),
        letterSpacing: 1,
        fontWeight: 'bold',
        color: 'white',
    },
    menssageResView: {
        marginTop: hp('1.5%'),
        alignSelf: 'center'
    },
    menssageRes: {
        color: 'white',
        alignSelf: 'center'
    }
})

export default Register;