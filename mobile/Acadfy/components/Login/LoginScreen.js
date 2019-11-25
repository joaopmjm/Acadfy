import React, {Component, useState} from 'react';
import api from '../../services/api';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Text, TextInput, View, ScrollView, Button, StyleSheet } from 'react-native';

class LoginScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          email: '',
          password: '',
          token: ''
      } 
    };
    postUser = async () => {
      const {email, password} = this.state
      try{
      const response = await api.post('/auth/login',{
        email: email,
        password: password
      })
      console.log(response.data)
      this.setState(response.data["token"])
    } catch (e){
      console.log(e)
    } 
  }
    render() {
      return (
        <View style={style.page}>
          <View>
            <Text style={style.title}>Login</Text>
          </View>
        <ScrollView>
          <View>
          <View>
            <Text style={style.text}>Email: </Text>
            <TextInput style={style.input} placeholder="nome@mail.com" onChange={(e) => this.setState({...this.state, email: e.target.value})}></TextInput>
            <Text style={style.text}>Senha: </Text>
            <TextInput style={style.input} secureTextEntry={true} placeholder="senha" onChange={(e) => this.setState({...this.state, password: e.target.value})}></TextInput> 
          </View>

          <View>
            <Button title="Entrar" type="clear" style={style.button} onClick={() => {this.postUser()}}></Button>
          </View>

          <View>
            <Button title="Cadstrar" type="text" style={style.button} onClick={() => {console.log("ir para cadastro")}}></Button>
          </View>
          </View>
        </ScrollView>
        </View>
      );
    }
  }

  const style = StyleSheet.create({
    page: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        backgroundColor: "#2E2E2E",

    },
    title: {
        color: 'white',
        letterSpacing: 5,
        fontSize: 40,
        marginTop: 2,
        marginBottom: 7,
        alignSelf: 'center',
    },
    text: {
      color: 'white',
      fontSize: 25,
    },
    input: {
      backgroundColor: 'white',
      borderColor: 'red',
      width: wp('30%'),
      borderRadius: 8,
      marginBottom: 30
    },
    button: {
      borderRadius: 8,
      marginBottom: 50
    }
  })
export default LoginScreen;
   