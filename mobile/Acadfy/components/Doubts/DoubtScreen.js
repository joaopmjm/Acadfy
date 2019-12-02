import React, {useEffect, useState} from 'react';
import { Text, TextInput,StyleSheet, View, ScrollView, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';

function DoubtScreen(){
  var [msgs, setMsgs] = useState([]);
  var [text, setText] = useState("");
  const [name, setName] = useState("");
  const [user_id, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [admin_id, setAdminId] = useState("");
  
 
  const getCoachId = async () => {
    let token = await AsyncStorage.getItem('token')
        try {
            const response = await Axios({
                url: 'http://107.20.116.185/consumer/trainer',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                }
            })
            console.log("Coach ID"+response.data);
            setAdminId(response.data)
        } catch (error) {
            console.error(error);
        }
  };
  const getUserData = async () => {
      console.log("Getting User Data");
      const get_name = await AsyncStorage.getItem("name");
      const get_usr_id = await AsyncStorage.getItem("id");
      const get_role = await AsyncStorage.getItem("role");
      setName(get_name);
      getCoachId();
      setUserId(get_usr_id);
      setRole(get_role);
    };
    
  const getHistory = async () => {
    // get Hist of chat
    let token = await AsyncStorage.getItem('token')
        try {
            const response = await Axios({
                url: 'http://107.20.116.185/message/history',
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
                body:{
                  'user_id':user_id,
                  'admin_id':admin_id,
                }
            })
            const resJSON = JSON.stringify(response.data);
            console.log("Historico "+ resJSON);
            //setMsgs(resJSON.data);
        } catch (error) {
            console.error(error);
        }
  };

  const handleSend = async () => {
    // // send msg, no momento soh atualiza localmente como o backend ainda nao esta finalizado
    if (role === "admin"){
      //para o professor mandar
      var new_msg = [{msg : text.text,author: name}];
    }else{
      //para o usuario mandar
      var new_msg = [{msg : text.text,author: name}];
    }
    var new_hist = msgs.concat(new_msg);
    setText("");
    setMsgs(new_hist);

    // actual coding after this line
    if (role === "admin"){
      let token = await AsyncStorage.getItem('token')
        try {
            const response = await Axios({
                url: 'http://107.20.116.185/message/admin-mensage',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
                body:{
                  'name': name,
                  'role':"admin",
                  'msn':text.text,
                  'admin_id':admin_id,
                  'user_id':user_id,
                }
            })
        } catch (error) {
            console.error(error);
        } finally{
          console.log("Added msg: " + text.text);
          setText("");
        }

    }else{
      let token = await AsyncStorage.getItem('token')
      const msn = text.text
        try {
            const response = await Axios({
                url: 'http://107.20.116.185/message/user-message',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
                body:{
                  'name': name,
                  'role':"consumer",
                  'msn':msn,
                  'admin_id':admin_id,
                  'user_id':user_id, 
                }
            })
            console.log("Exited sending")
        } catch (error) {
            console.error(error);
        }finally{
          console.log("Added msg: " + text.text);
          setText("");
        }
  };}

  useEffect(()=>{
    if (name === ""){getUserData();}
    getHistory();
  });
    
  return (
    <KeyboardAvoidingView style={styles.page}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Tire sua duvida:</Text>
      </View>
      <View style={styles.chatBox}>
        <ScrollView>
          {msgs.map(mens => ( 
            (<Text style={styles.msg}>{mens.author} : {mens.msg}</Text>)
          ))}
        </ScrollView>
      </View>
      <View style={styles.sendBox}>
        <TextInput style={styles.textBox} onChangeText={(text) => setText({text})} placeholder="Sua duvida" value={text}></TextInput>
        {/* <Button type="clear" icon={<Icon name="ios-arrow-dropup" size={30} color="white" />} onPress={() => {handlePhoto()}}/> */}
        <Button type="clear" icon={<Icon name="md-send" size={30} color="white" />} onPress={() => {handleSend()}}/>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    page: {
      height: '100%',
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
    titleBox:{
      flex: 1,
      marginBottom: hp('2%'),
    }, 
    sendBox:{
      flexDirection:'row', 
      flexWrap:'wrap',
      height:hp('70%'),
      flex:2,
    },
    chatBox : {
      flex:8,
    },
    textBox:{
      width: wp("85%"),
      color: "white",
      fontSize:18,
    },
    chat : {
      alignItems: 'flex-start',
      height: '100%',
      width:"100%"
    },
    botao:{
      width: wp('15%'),
    },
    msg: {
        color: "#FFFFFF",
        fontSize: 18,
    }
})

export const msgBox = props => (
  <View style={{flexDirection:'row', flexWrap:'wrap'}}>
    <Text>{props.sender}</Text><Text>{props.msg}</Text>
  </View>
)
export default DoubtScreen;
  