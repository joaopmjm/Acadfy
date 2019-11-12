import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Formik } from 'formik';
import { Button, Input } from "react-native-elements";

class InformationScreen extends React.Component {
    render() {
        /*return (
            <View style={styles.title}>
                <Text style={{ color: "white" }}>InformationScreen</Text>
                <MyReactNativeForm />
            </View>

        ); */
        return (
            <MyReactNativeForm />
        )
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
        color: "white"
    }
})

export const MyReactNativeForm = props => (
    <Formik
      initialValues={{ nome: '',idade: '', peso: '', altura: '',  }}
      onSubmit={values => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}> 
          <Text 
            style={styles.title}>
              Informações
          </Text>

          <Input
            label='Nome'
            labelStyle={styles.input}
            placeholder='Escreva seu nome'
            inputStyle={styles.input}
            onChangeText={handleChange('nome')}
            onBlur={handleBlur('nome')}
            value={values.nome}
          />
          <Input
            label='Idade'
            labelStyle={styles.input}
            placeholder='Escreva sua idade'
            inputStyle={styles.input}
            onChangeText={handleChange('idade')}
            onBlur={handleBlur('idade')}
            value={values.idade}
          />
          <Input
            label='Peso'
            labelStyle={styles.input}
            placeholder='Escreva seu peso'
            inputStyle={styles.input}
            onChangeText={handleChange('peso')}
            onBlur={handleBlur('peso')}
            value={values.peso}
          />
          <Input
            label='Altura'
            labelStyle={styles.input}
            placeholder='Escreva sua altura'
            inputStyle={styles.input}
            onChangeText={handleChange('altura')}
            onBlur={handleBlur('altura')}
            value={values.altura}
          />
          <Button onPress={handleSubmit} title="Salvar" />
        </View>
      )}
    </Formik>
  );


export default InformationScreen;