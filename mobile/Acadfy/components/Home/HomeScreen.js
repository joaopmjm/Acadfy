import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, AsyncStorage } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { api } from '../../services/api';
import Axios from 'axios';



class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: '',
            month: '',
            year: '',
            sunday: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            currentDayNumber: 0,
            currentDay: 'sunday',
            token: "",
            series: [],
            reps: []
        }
        var today = new Date().getDay();
        this.getWorkouts(today);

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
        if (this.state.day !== 30) {
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
        setTimeout(() => this.getWorkouts(this.state.currentDayNumber), 500);

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
        if (this.state.day !== 1) {
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
        setTimeout(() => this.getWorkouts(this.state.currentDayNumber), 500);

    }


    async getWorkouts(day) {
        const days = {
            0: 'sunday',
            1: 'monday',
            2: 'tuesday',
            3: 'wednesday',
            4: 'thursday',
            5: 'friday',
            6: 'saturday'
        }
        let token = await AsyncStorage.getItem('token')
        try {
            const response = await Axios({
                url: "http://107.20.116.185/workouts/consumer",
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                data: {
                    'day': day
                }
            })
            let weekDay = days[day]
            let exerciseList = []
            let exerciseSeries = []
            let exerciseReps = []
            response.data.map((i) => exerciseList.push(i['name']))
            response.data.map((i) => exerciseSeries.push(i['series']))
            response.data.map((i) => exerciseReps.push(i['repetition']))
            this.setState({
                [weekDay]: exerciseList,
                series: exerciseSeries,
                reps: exerciseReps
            })
        } catch (error) {
            console.log(error)
        }


    }
    finishExercise() {
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
                                    subtitle={this.state.series[i] + "x" + this.state.reps[i]}
                                    titleStyle={{ color: "white", alignSelf: 'center' }}
                                    subtitleStyle={{ color: "white", alignSelf: 'center' }}
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