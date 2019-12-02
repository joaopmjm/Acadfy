import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, AsyncStorage } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';



class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: '',
            month: '',
            year: '',
            sunday: ["Supino reto", "Supino inclinado", "Leg Press", "Stiff", "Levantamento Terra"],
            monday: ["Agachamento livre", "Avanço livre", "Levantamento Terra", "Remada fechada", "Elevação lateral"],
            tuesday: ["Exercício 1", "Exercício 2", "Exercício 3", "Exercício 4"],
            wednesday: ["Exercício 1", "Exercício 2", "Exercício 3", "Exercício 4"],
            thursday: ["Exercício 1", "Exercício 2", "Exercício 3", "Exercício 4"],
            friday: ["Exercício 1", "Exercício 2", "Exercício 3", "Exercício 4"],
            saturday: ["Exercício 1", "Exercício 2", "Exercício 3", "Exercício 4"],
            currentDayNumber: '',
            currentDay: 'sunday',
            token: "",
        }
        this.getToken();
    }

    async getToken(){
        this.setState({
            token: await AsyncStorage.getItem('token'),
        });
    }

    componentDidMount() {
        var day = new Date().getDate();
        var weekDay = new Date().getDay();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var months = {
            1: "janeiro",
            2: "fevereiro",
            3: "março",
            4: "abril",
            5: "maio",
            6: "junho",
            7: "julho",
            8: "agosto",
            9: "setembro",
            10: "outubro",
            11: "novembro",
            12: "dezembro"
        }
        var days = {
            0: 'sunday',
            1: 'monday',
            2: 'tuesday',
            3: 'wednesday',
            4: 'thursday',
            5: 'friday',
            6: 'saturday'
        }
        this.setState({
            day: day,
            month: months[month],
            year: year,
            currentDayNumber: weekDay,
            currentDay: days[weekDay]
        })
    }

    goToNextDay() {
        var days = {
            0: 'sunday',
            1: 'monday',
            2: 'tuesday',
            3: 'wednesday',
            4: 'thursday',
            5: 'friday',
            6: 'saturday'
        }
        var today = this.state.currentDayNumber;
        var todayNumber = this.state.day;
        if (today === 6) {
            this.setState({
                day: todayNumber + 1,
                currentDay: days[0],
                currentDayNumber: 0
            })
        } else {
            this.setState({
                day: todayNumber + 1,
                currentDay: days[today + 1],
                currentDayNumber: today + 1
            })

        }

    }

    goToPreviouslyDay() {
        var days = {
            0: 'sunday',
            1: 'monday',
            2: 'tuesday',
            3: 'wednesday',
            4: 'thursday',
            5: 'friday',
            6: 'saturday'
        }
        var today = this.state.currentDayNumber;
        var todayNumber = this.state.day;
        if (today === 0) {
            this.setState({
                day: todayNumber - 1,
                currentDay: days[6],
                currentDayNumber: 6
            })
        } else {
            this.setState({
                day: todayNumber - 1,
                currentDay: days[today - 1],
                currentDayNumber: today - 1,
            })
        }

    }

    finishExercise(){
        //call API to finish exercise
    }

    render() {
        return (
            <View style={styles.page}>
                <ScrollView>
                    <Text style={styles.title}>Treinos</Text>
                    <Text style={styles.date}>{this.state.day + " de " + this.state.month + " de " + this.state.year}</Text>
                    <View style={styles.hrDate} />
                    <View style={styles.exercises}>
                        <View style={styles.buttons}>
                            <Button type="clear" icon={<Icon name="ios-arrow-dropleft" size={45} color="white" />} onPress={() => {
                                this.goToPreviouslyDay();
                            }} />
                            <Button type="clear" icon={<Icon name="ios-arrow-dropright" size={45} color="white" />} onPress={() => {
                                this.goToNextDay();
                            }} />
                        </View>
                        {
                            this.state[this.state.currentDay].map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l}
                                    subtitle="3x10 repetições"
                                    titleStyle={{ color: "white", alignSelf: 'center'}}
                                    subtitleStyle={{ color: "white", alignSelf: 'center'}}
                                    containerStyle={{ backgroundColor: "#2E2E2E" }}
                                    bottomDivider

                                />
                            ))
                        }
                    </View>
                    <View style={styles.end}>
                        <Button title="Finalizar treino" buttonStyle={{ backgroundColor: '#0174DF', borderRadius: 20 }} />
                    </View>
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
        letterSpacing: 5,
        fontSize: wp('7%'),
        marginTop: hp('2%'),
        marginBottom: hp('7%'),
        alignSelf: 'center',
    },
    date: {
        color: 'white',
        fontSize: wp('7%')
    },
    hrTitle: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.3,
        marginBottom: hp('2%'),
        alignSelf: 'center',
        width: wp('35%'),
    },
    hrDate: {
        borderBottomColor: 'gray',
        borderBottomWidth: 0.3,
        marginBottom: hp('2%'),
        alignSelf: 'center',
        width: wp('75%'),
    },
    exercises: {
        marginBottom: hp('5%')

    },
    buttons: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    end: {
        marginBottom: hp('5%'),
    }
})
export default HomeScreen;