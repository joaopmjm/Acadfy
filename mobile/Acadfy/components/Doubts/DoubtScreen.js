import React from 'react';
import { 
  Text, 
  View,
  TextInput,
  StyleSheet,
   Button,
   TouchableOpacity,
   ViewPropTypes,
 } from 'react-native';
 import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";import api from '../../services/api';

class DoubtScreen extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      msg : "",
      messages: [],
      name: "",
    };
  }
  

  onPress = () => {
    //send msg
  }
  onChangeText = msg => this.setState({msg});

  postMsg = async () => {
    const { email, password } = this.state
    try {
      const response = await api.post('/mensage/user_mensage', {
        name: this.state.name,
        role: "user",
        msn:"" 
      });
      console.log(response.data)
      this.setState({
        token: response.data['token']
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
        return (
          <View style={styles.background}>
            <Text style={styles.title}>Tire sua duvida</Text>
            <TextInput
              style={styles.textInput}
              placeholder="your doubt"
              onChangeText={this.onChangeText}
            />
            <TouchableOpacity onPress={this.onPress}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: "#2E2E2E",
    height: '100%',
  },
    textInput: {
      height: hp("10%"),
      margin: 10,
      paddingHorizontal: 10,
      borderColor: '#111111',
      borderWidth: 1,
    },
    sender: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#2E2E2E"
    },
    msg: {
        color: "white",
        fontSize: 25,
        marginTop: 20,
        marginBottom: 30
    },
    buttonText: { // 5.
      marginLeft: 10,
      fontSize: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white"
    },
})

export const msgBox = props => (
  <View style={{flexDirection:'row', flexWrap:'wrap'}}>
    <Text>{props.sender}</Text><Text>{props.msg}</Text>
  </View>
)
export default DoubtScreen;
  