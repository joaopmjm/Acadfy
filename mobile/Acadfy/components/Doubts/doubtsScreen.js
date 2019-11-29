import React, {useEffect} from 'react';
import { Text, TextInput, Button } from 'react-native';
import {} from "react-native-responsive-screen";

data = {
  "1":{
      "msg":"eu to com duvida se o supino reto eh realmente reto",
      "author":"aluno"
  },
  "2":{
      "msg":"Mano, costuma ser sim, se tu ta fazendo diferente ta errado",
      "author":"Rodrigo Personal"
  }
}

class DoubtScreen extends React.Component {
  state = {
    hist = [],
    text = "",
  };

  getHistory = () => {
    data = JSON.parse(history.json);
    this.setState({hist: data});
    console.log(this.state.hist);
  } 

  handleSend = () => {
    fetch("localhost://3000/get/sendHelp",{
      method: "POST",
      headers:{
        Accept:"application/json",
        'Content-Type':'application/json'
    },
      body: JSON.stringify({
        msg: this.state.text,
        secondParam: "aluno", 
      }),
    });
  }

  handlePhoto= () => {
    let formData = new FormData();
    formData.append("videoFile", {
        name: name.mp4,
        uri: video.uri,
        type: 'video/mp4'
    });
    formData.append("id", "1234567");

    try {
        let response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        });
        return await response.json();
    }
    catch (error) {
        console.log('error : ' + error);
        return error;
    }
  }
    
    render() {
        return (
            <View style={styles.page}>
                <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
        </ScrollView>

        <Text>Tire sua duvida:</Text><br/>
        <TextInput onChangeText={(text) => this.setState({text})} placeholder="Sua duvida" value={this.state.text}></TextInput>
        <Button title="Enviar" onClick={this.handleSend()}/><Button title="upload" onClick={this.handlePhoto()}/>
        {this.state.hist.map(mens => (
          (<Text style={styles.sender}>{mens.author}</Text>,<Text style={styles.msg}>{mens.msg}</Text>)
        ))}
            </View>

        );
    }
}

const styles = StyleSheet.create({
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
    }
})
export default DoubtScreen;
  