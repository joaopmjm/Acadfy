import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';



class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '5 de novembro de 2019'
        }

        function goToNextDay() {
            this.setState({
                date: date + 1
            })
        }
    }
    render() {
        const list = [
            {
                exercise: 'Supino reto',
                number: '3x12 repetições',
                rest: '60 segundos'
            },
            {
                exercise: 'Supino inclinado',
                number: '3x8 repetições',
                rest: '60 segundos'
            },
            {
                exercise: 'Leg Press',
                number: '3x12 repetições',
                rest: '50 segundos'
            },
            {
                exercise: 'Stiff',
                number: '3x12 repetições',
                rest: '50 segundos'
            },
            {
                exercise: 'Levantamento Terra',
                number: '3x12 repetições',
                rest: '50 segundos'
            },
        ]
        return (
            <View style={styles.page}>
                <ScrollView>
                    <Text style={styles.title}>Treinos</Text>
                    {/* <Calendar
                        style={{
                            borderWidth: 1,
                            borderColor: 'gray',
                            height: 350,
                            backgroundColor: "#2E2E2E",
                            marginBottom: hp('5%'),
                            borderColor: "#0174DF"
                        }}
                        theme={{
                            textDayFontFamily: "l",
                            backgroundColor: '#2E2E2E',
                            calendarBackground: '#2E2E2E',
                            textSectionTitleColor: 'white',
                            selectedDayBackgroundColor: 'blue',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: "#0174DF",
                            dayTextColor: 'white',
                            textDisabledColor: '#d9e1e8',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            monthTextColor: 'white',
                            indicatorColor: 'white',
                        }}
                    /> */}
                    <Text style={styles.date}>{this.state.date}</Text>
                    <View style={styles.hrDate} />
                    <View style={styles.exercises}>
                        <View style={styles.buttons}>
                            <Button type="clear" icon={<Icon name="ios-arrow-dropleft" size={45} color="white" />} />
                            <Button type="clear" icon={<Icon name="ios-arrow-dropright" size={45} color="white" />} onPress={() => {
                                console.log('clicked');
                            }} />
                        </View>
                        {
                            list.map((l, i) => (
                                <ListItem
                                    key={i}
                                    title={l.exercise}
                                    subtitle={l.number}
                                    checkBox
                                    titleStyle={{ color: "white" }}
                                    subtitleStyle={{ color: "white" }}
                                    containerStyle={{ backgroundColor: "#2E2E2E" }}
                                    bottomDivider
                                />
                            ))
                        }
                    </View>
                    {/* <Button  icon={<Icon na size={15} color="white" />} /> */}
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
    }
})
export default HomeScreen;