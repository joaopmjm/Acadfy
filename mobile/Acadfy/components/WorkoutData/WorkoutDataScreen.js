import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Badge, Button } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';



class WorkoutDataScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.page}>
                <ScrollView>
                    <Text style={styles.title}>Treinos realizados</Text>
                    <Text style={styles.workoutsNumber}>10</Text>
                    <Text style={styles.workoutsDescription}>Treinos de perna realizados no último mês</Text>
                    <Text style={styles.workoutsNumber}>15</Text>
                    <Text style={styles.workoutsDescription}>Treinos de superiores realizados no último mês</Text>
                    <Text style={styles.workoutsNumber}>10</Text>
                    <Text style={styles.workoutsDescription}>Treinos cardiovasculares realizados no último mês</Text>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        backgroundColor: "#2E2E2E",

    },
    title: {
        color: 'white',
        letterSpacing: 4,
        fontSize: wp('7%'),
        marginTop: hp('2%'),
        marginBottom: hp('7%'),
        alignSelf: 'center',
    },
    workoutsNumber:{
        fontSize: hp('3%'),
        color: 'white',
        alignSelf: 'center',
        backgroundColor: '#0174DF',
        borderRadius: wp('5%'),
        padding: wp('2%')

    },
    workoutsDescription: {
        marginTop: hp('3%'),
        marginLeft: wp('5%'),
        marginRight: wp('5%'),
        marginBottom: hp('5%'),
        alignSelf: 'center',
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center', 
        fontSize: hp('3%')
    },
  
  
})
export default WorkoutDataScreen;