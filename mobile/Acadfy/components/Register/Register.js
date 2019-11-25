import React, { Component } from 'react';
import api from '../../services/api';

import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

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

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validatePassword(password) {
        var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (password.value.match(paswd)) {
            return true;
        }
        else {
            return false;
        }
    }

register = async () => {
    const { name, email, password, password2 } = this.state;

    try {
        if (name !== '' && email !== '' && password !== '' && password2 !== '') {

            if (this.validateEmail(email)) {
            
                if (this.validatePassword(password)){
            
                    if (password === password2) {
                        const response = await api.post('/auth/register', {
                            name: this.state.name,
                            email: this.state.email,
                            password: this.state.password,
                        })
                            .catch(response => console.log(response))
    
                        console.log(response)
                        this.setState({ isRegistred: true, menssage: response.data })

                    } else { this.setState({ isRegistred: false, erro: "Senhas não coincidem!" }) }
                
                } else { this.setState({ isRegistred: false, erro: "Senha possui caracteres não aceitos!" }) }
            
            } else { this.setState({ isRegistred: false, erro: "Email digitado não é um email!" }) }

        } else { this.setState({ isRegistred: false, erro: "Há campos não preenchidos!" }) }

    } catch (err) {
        this.setState({ isRegistred: false, erro: "Email já registrado!" })
        console.log(err);
    }
}

render() {
    return (
        <View style={styles.page}>
            <Text style={styles.title}>Cadastro</Text>
            <View>
                <TextInput
                    style={styles.form}
                    type="text"
                    placeholder="Digite seu nome"
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                />
                <TextInput
                    style={styles.form}

                    placeholder="Digite seu email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput
                    style={styles.form}
                    placeholder="Digite sua senha"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <TextInput
                    style={styles.form}
                    placeholder="Digite sua senha novamente"
                    value={this.state.password2}
                    onChangeText={password2 => this.setState({ password2 })}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => { this.register() }} >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <View style={styles.menssageResView}>
                {this.state.isRegistred ?
                    <Text style={styles.menssageRes}>{this.state.menssage}</Text> :
                    <Text style={styles.menssageRes}>{this.state.erro}</Text>}
            </View>
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
    form: {
        height: 45,
        width: hp('40%'),
        paddingHorizontal: 10,
        backgroundColor: 'white',
        marginBottom: hp('1%'),
        borderRadius: 20
    },
    button: {
        marginTop: hp('2%'),

        height: 45,
        width: hp('40%'),
        borderRadius: 20,
        backgroundColor: '#069',

        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: wp('4%'),
        letterSpacing: 1,
        fontWeight: 'bold',
        color: 'white',
    },
    menssageResView: {
        marginTop: hp('2%'),
    },
    menssageRes: {
        color: 'white',
    }
})

export default Register;