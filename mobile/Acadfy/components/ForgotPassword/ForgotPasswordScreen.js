import React, { Component, useState } from 'react';
import api from '../../services/api';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';

class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      msg1: '',
      msg2: '',
      password: '',
      code: '',
      erro: '',
    }

    this.sendEmail = this.sendEmail.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
  };

  sendEmail = async () => {
    const { email} = this.state
    try {
      const response = await api.post('/auth/forgot-password', {
        email: email
      })
      if (response) {
        console.log('Enviou Email')
        this.setState({
          msg1: response.data
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  resetPassword = async () => {
    const { email, password, code} = this.state
    try {
      const response = await api.post('/auth/reset-password', {
        email: email,
        password: password,
        code: code,
      })
      if (response) {
        console.log('Senha Atualizada')
        this.setState({
          msg2: response.data
        })
      }
    } catch (e) {
      console.log(e)
    }
  }



  render() {
    return (
      <View style={styles.page}>

        <Text style={styles.label}>Email: </Text>
        <TextInput placeholderTextColor='gray' style={styles.input} placeholder="Digite seu email" onChangeText={(text) => this.setState({ email: text })}></TextInput>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.actionButtons} onPress={() => { this.sendEmail() }}><Text style={styles.buttonText}>Enviar</Text></TouchableOpacity>
        </View>

        {this.state.msg1 != null ? <View><Text style={styles.erro}>{this.state.msg1}</Text></View> : null}

        <Text style={styles.label}>Código: </Text>
        <TextInput placeholderTextColor='gray' style={styles.input} placeholder="Digite o código" onChangeText={(text) => this.setState({ code: text })}></TextInput>

        <Text style={styles.label}>Nova Senha: </Text>
        <TextInput placeholderTextColor='gray' style={styles.input} secureTextEntry={true} placeholder="Digite sua nova senha" onChangeText={(text) => this.setState({ password: text })}></TextInput>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.actionButtons} onPress={() => { this.resetPassword() }}><Text style={styles.buttonText}>Salvar</Text></TouchableOpacity>
        </View>

        {this.state.msg2 != null ? <View><Text style={styles.erro}>{this.state.msg2}</Text></View> : null}
        
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.actionButtons} onPress={() => { this.props.navigation.navigate('Login') }}><Text style={styles.buttonText}>Voltar</Text></TouchableOpacity>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2E2E2E",

  },
  title: {
    color: 'white',
    letterSpacing: 5,
    fontSize: 40,
    marginBottom: hp('10%'),
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
  actionButtons: {
    borderRadius: 20,
    width: wp('40%'),
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#069'
  },
  buttonView: {
    marginTop: hp('2%'),
    marginBottom: hp('2%')
  },
  buttonText: {
    fontSize: wp('4%'),
    letterSpacing: 1,
    fontWeight: 'bold',
    color: 'white',

  },
  erro: {
    color: "green",
    fontSize: wp('4%'),
    marginTop: hp('2%'),
  }
})
export default ForgotPasswordScreen;