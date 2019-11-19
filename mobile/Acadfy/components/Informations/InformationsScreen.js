import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { Button, Input, ButtonGroup } from "react-native-elements";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import DatePicker from "react-native-date-picker";

class InformationScreen extends React.Component {
  render() {
    return <MyReactNativeForm />;
  }
}
const primaryBlue = "#2196f3";
const imageWidth = "80%";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#2E2E2E",
    color: "white"
  },
  forgottenPasswordButtonContainer: {
    width: imageWidth
  },
  forgottenPasswordTitle: {
    color: primaryBlue
  },
  loginButtonContainer: {
    width: imageWidth
  },
  loginButton: {
    backgroundColor: primaryBlue
  },
  loginButtonTitle: {
    color: "white"
  },
  disabled: {
    backgroundColor: "white",
    opacity: 0.3
  },
  input: {
    color: "white"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  item: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    width: 390
  }

});

export const MyReactNativeForm = props => (
  <Formik
    initialValues={{ nome: "", idade: "", peso: "", altura: "", sexo: 0, date: new Date() }}
    onSubmit={values => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
      <View style={styles.container}>
        <Text style={styles.title}>Informações</Text>

        <Input
          label="Nome"
          labelStyle={styles.input}
          placeholder="Escreva seu nome"
          inputStyle={styles.input}
          onChangeText={handleChange("nome")}
          onBlur={handleBlur("nome")}
          value={values.nome}
        />
        
        <Input
          label="Peso"
          labelStyle={styles.input}
          placeholder="Escreva seu peso"
          inputStyle={styles.input}
          onChangeText={handleChange("peso")}
          onBlur={handleBlur("peso")}
          value={values.peso}
        />
        <Input
          label="Altura"
          labelStyle={styles.input}
          placeholder="Escreva sua altura"
          inputStyle={styles.input}
          onChangeText={handleChange("altura")}
          onBlur={handleBlur("altura")}
          value={values.altura}
        />

        <Text style={styles.item}>Data de Nascimento</Text>

        <DatePicker mode="date" date={values.date} onDateChange={date => setFieldValue("date", date, false)} />

        <Text style={styles.item}>Gênero</Text>
        
        <ButtonGroup
          onPress={selectedIndex => setFieldValue("sexo", selectedIndex, false)}
          selectedIndex={values.sexo}
          buttons={["Masculino", "Feminino"]}
          containerStyle={{ height: 40 }}
        />
      
        <Button onPress={handleSubmit} title="Salvar" />

      </View>
    )}
  </Formik>
);

export default InformationScreen;
