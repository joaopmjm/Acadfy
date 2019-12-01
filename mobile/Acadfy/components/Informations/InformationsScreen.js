import React from "react";
import { Text, View, ScrollView, StyleSheet, KeyboardAvoidingView } from "react-native";
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
    color: "white",
    marginLeft: wp('5%'),
    marginRight: wp('5%')
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
    color: "white",
    width: wp('80%')
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: hp('5%'),
    marginTop: hp('1%')
  },
  item: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    width: 330,
  },
  background: {
    backgroundColor: "#2E2E2E",
    height: '100%',

  },
  inputField: {
    marginBottom: hp("4%")
  },
  box: {
    marginBottom: hp('5%'),
  },
  saveButton: {
    marginTop: hp('5%'),
    marginBottom: hp('5%')
  },
  calendar: {
    marginTop: hp('5%'),
    marginBottom: hp('5%')
  },
  
});

export const MyReactNativeForm = props => (
  <Formik
    initialValues={{ nome: "", idade: "", peso: "", altura: "", sexo: 0, date: new Date() }}
    onSubmit={values => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
      <ScrollView>
        <View style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.title}>Informações</Text>
            <KeyboardAvoidingView style={styles.box}>
              <Input
                label="Nome"
                labelStyle={styles.input}
                placeholder="Escreva seu nome"
                inputStyle={styles.input}
                onChangeText={handleChange("nome")}
                onBlur={handleBlur("nome")}
                value={values.nome}
              />
            </KeyboardAvoidingView>
            <KeyboardAvoidingView style={styles.box}>
              <Input
                label="Peso"
                labelStyle={styles.input}
                placeholder="Escreva seu peso"
                inputStyle={styles.input}
                onChangeText={handleChange("peso")}
                onBlur={handleBlur("peso")}
                value={values.peso}
              />
            </KeyboardAvoidingView>
            <KeyboardAvoidingView style={styles.box}>
              <Input
                label="Altura"
                labelStyle={styles.input}
                placeholder="Escreva sua altura"
                inputStyle={styles.input}
                onChangeText={handleChange("altura")}
                onBlur={handleBlur("altura")}
                value={values.altura}
              />
            </KeyboardAvoidingView>

            <Text style={styles.item}>Data de Nascimento</Text>

            <DatePicker style={styles.calendar} mode="date" date={values.date} onDateChange={date => setFieldValue("date", date, false)} />

            <Text style={styles.item}>Gênero</Text>

            <ButtonGroup
              onPress={selectedIndex => setFieldValue("sexo", selectedIndex, false)}
              selectedIndex={values.sexo}
              buttons={["Masculino", "Feminino"]}
              containerStyle={{ height: 40, marginTop: hp('5%') }}
            />
            <View style={styles.saveButton}>
              <Button onPress={handleSubmit} title="Salvar" />
            </View>

          </View>
        </View>
      </ScrollView>
    )}
  </Formik>
);

export default InformationScreen;
