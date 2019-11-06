import React, {useEffect} from 'react';
import { Text, TextInput, Button } from 'react-native';

const getHistory = async (e) => {
  try {let response = await fetch(
    "localhost://3000/getHistory",{
      headers:{
        userid : "1",
        username : "rod",
        teacherid : "14"
      }
    }
  );
  let responseJson = await response.json();
  setHist(responseJson);
} catch (error) {
  console.error(error);
};
};

class HomeScreen extends React.Component {
  state = {
    hist = [],
  };

  getHistory = async () => {
    await fetch("localhost://3000/getHistory")
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({hist: responseJson});
    })
  }
    
    render() {
        return (
            <View style={styles.page}>
                <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
        </ScrollView>

        <Text>Tire sua duvida:</Text><br/>
        <TextInput placeholder="Sua duvida"></TextInput>
        <Button title="Enviar" onClick={handleSend()}/>
        {this.state.hist.map(mens => (
          (<Text style={styles.sender}>{mens.author}</Text>,<Text style={styles.msg}>{mens.msg}</Text>)
        ))}
            </View>

        );
    }
}

function showHistory(props){
  const msg = props.msg;
  const listarMsg = msg.map((msg) => 
  <View>
    <Text style={style.sender}>{msg.author}</Text><br/>
    <Text style={style.msg}>{msg.text}</Text><br/>
  </View>
  );
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
export default HomeScreen;
