import React, { Component, useState } from 'react';
import api from '../../services/api';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: '',
      erro: '',
    }

    this.postUser = this.postUser.bind(this)
  };

  postUser = async () => {
    const { email, password } = this.state
    try {
      const response = await api.post('/auth/login', {
        email: email,
        password: password
      })
      if (response.data["expiresIn"] == "900" || response.data["expiresIn"] == "9000000") {
        console.log("Logou")
        this.setState({
          token: response.data["token"]
        })
        await AsyncStorage.setItem('token', response.data['token'])
        if (response.data['role'] == 'admin') {
          this.props.navigation.navigate("AppAdmin")
        } else {
          this.props.navigation.navigate("App")
        }
        await AsyncStorage.setItem('name', response.data['name'])
        await AsyncStorage.setItem('email', response.data['email'])
        await AsyncStorage.setItem('id', response.data['_id'])

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
        <Text style={styles.label}>Senha: </Text>
        <TextInput placeholderTextColor='gray' style={styles.input} secureTextEntry={true} placeholder="Digite sua senha" onChangeText={(text) => this.setState({ password: text })}></TextInput>

        {this.state.erro != null ? <View><Text style={styles.erro}>{this.state.erro}</Text></View> : null}

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.actionButtons} onPress={() => { this.postUser() }}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.actionButtons} onPress={() => { this.props.navigation.navigate('Register') }}><Text style={styles.buttonText}>Cadastrar</Text></TouchableOpacity>
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
    marginTop: hp('4%')
  },
  buttonText: {
    fontSize: wp('4%'),
    letterSpacing: 1,
    fontWeight: 'bold',
    color: 'white',

  },
  erro: {
    color: "red"
  }
})
export default LoginScreen;