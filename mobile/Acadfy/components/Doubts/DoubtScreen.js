import React, {useEffect, useState} from 'react';
import { Text, TextInput,StyleSheet, View, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ListItem, Button } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';

function DoubtScreen(){
  var [msgs, setMsgs] = useState([{msg:"socorro",author:"User"},{msg:"o que foi senhor",author:"Treinador"},{msg:"quebrei do dedo",author:"User"}]);
  var [text, setText] = useState("");

  const getHistory = () => {
    // get Hist of chat
  } 

  const handleSend = () => {
    // send msg
    var new_msg = [{msg : text.text,author:"User"},{msg : "Hard coded response msg please finish the backend", author:"Server"}];
    var new_hist = msgs.concat(new_msg);
    setText("");
    setMsgs(new_hist);
  }

  const handlePhoto= () => {

  };
  useEffect(()=>{
    getHistory();
  },[msgs,text]);
    
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Tire sua duvida:</Text>
      <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        <TextInput style={styles.textBox} onChangeText={(text) => setText({text})} placeholder="Sua duvida" value={text}></TextInput>
        <Button type="clear" icon={<Icon name="ios-arrow-dropup" size={30} color="white" />} onPress={() => {handlePhoto()}}/>
        <Button type="clear" icon={<Icon name="md-send" size={30} color="white" />} onPress={() => {handleSend()}}/>
      </View>
      <ScrollView>
        {msgs.map(mens => (
          (<Text style={styles.msg}>{mens.author} : {mens.msg}</Text>)
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
      page: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        backgroundColor: "#2E2E2E",

    },
    title:{
        color: 'white',
        letterSpacing: 4,
        fontSize: wp('7%'),
        marginTop: hp('2%'),
        marginBottom: hp('7%'),
        alignSelf: 'center',
    },
    chat : {
      alignItems: 'flex-start',
      height: '100%',
      width:"100%"
    },
    textBox:{
      width: wp("75%"),
      color: "white",
      fontSize:18,
    },
    botao:{
      width: wp('10%'),
      height:hp("100%"),
    },    
    sender: {
      color: "white",
      fontSize: 18,
    },
    msg: {
        color: "white",
        fontSize: 18,
    }
})
export default DoubtScreen;
  