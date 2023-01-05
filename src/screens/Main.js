import React, { useContext, useEffect, } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { ListItem, SearchBar, Button } from 'react-native-elements'
import { ReceptionContext } from '../context/reception/ReceptionContext';
import { EmptyListMessage } from '../components/EmptyListMessage';
import { THEME } from '../themes';
import { AppInputDate } from '../components/ui/AppInputDate';
import moment from 'moment';
import { TextError } from '../components/TextError';
import Icon from 'react-native-vector-icons/AntDesign';
import {ScheduleElement} from '../components/ScheduleElement'

export const Main = ({ navigation, route }) => {

	const { getDoctorsSchedule, doctorsSchedule, errorSchedule,
		loadingDoctorsSchedule, doctors, openPatient, date, setFild, fDoctor, fNamePatient } = useContext(ReceptionContext);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Расписание врачей',
			headerTitleStyle: {
				fontSize: 16,
			},
		});
	}, []);

	useEffect(() => {
		hendlerGetDoctorsSchedule();
	}, [date, fDoctor]);

	const useFilter = (item) => {
		const nameMatches = (!fNamePatient || item.presentationPatient.trim().toLowerCase().includes(fNamePatient.trim().toLowerCase()));
		return nameMatches && (fDoctor == item.employee.guid || fDoctor == 'all');
	}

	const hendlerGetDoctorsSchedule = () => {
		getDoctorsSchedule(moment(date).format('YYYYMMDD'), fDoctor);
	}

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (

				<View >
					<TouchableOpacity onPress={() => { navigation.navigate('Info') }}>
						<Icon
							name="setting"
							size={25}
							color={"white"}
						/>
					</TouchableOpacity>
				</View>
			)
		});
	}, [route]);

	const onPressScheduleItem = (item) => {

		if (item.medicalCard.guid === "") {
			Alert.alert("Внимание", "Карта пациента не зарегистрирована\n\n" + "Комментарий: " + item.comment);
			return;
		}
		openPatient(item.patient, item.medicalCard, item.guidService, navigation)
	}

	const renderItem = ({ index, item }) => (<ScheduleElement item={item} onPress = {()=> onPressScheduleItem(item)}/>);

	let doctorsFilter = Object.assign([], doctors);
	doctorsFilter.unshift({ guid: 'all', name: 'Все' });

	return (
		<View style={styles.container}>
			<View style={{ paddingLeft: 6, paddingRight: 6, backgroundColor: "white", justifyContent: "space-between", marginTop: 10, marginBottom: 5, flexDirection: 'row' }}>
				<AppInputDate textStyle={{ fontSize: 20 }} date={date} setDate={(value) => { setFild("date", value) }} showTime={false} />
			</View>

			<View style={[styles.doctors]}>
				<ScrollView horizontal={true} style={[styles.contentContainer]} >
					{doctorsFilter.map(item =>
						<View style={styles.wraperDoctorItem} key={item.guid} >
							<TouchableOpacity style={[styles.doctorItem, item.guid == fDoctor ? styles.selectDoctorItem : null]} onPress={() => setFild("fDoctor", item.guid)}>
								<Text numberOfLines={2} style={[styles.doctorItemText, item.guid == fDoctor ? styles.selectdoctorItemText : null]}>{item.name}</Text>
							</TouchableOpacity>
						</View>)}
				</ScrollView>
			</View>

			<SearchBar
				placeholder="Поиск по имени"
				onChangeText={value => setFild("fNamePatient", value)}
				value={fNamePatient}
				lightTheme
				showLoading
				inputContainerStyle={{ backgroundColor: "white", height: 25 }}
				containerStyle={{ marginLeft: 5, backgroundColor: "white", height: 45, marginRight: 5 }}

				loadingProps={{
					animating: false,
					color: THEME.MAIN_COLOR,
				}}
			/>

			{errorSchedule && <TextError textError={errorSchedule} />}

			<View>
				<FlatList

					data={doctorsSchedule.filter(item => useFilter(item))}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
					onRefresh={() => hendlerGetDoctorsSchedule()}
					refreshing={loadingDoctorsSchedule}
					ListEmptyComponent={<EmptyListMessage loading={loadingDoctorsSchedule} />}

				/>

			</View>
		</View>
	);
}


const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
			backgroundColor: "white",
			padding: 2
		},
		icons: {
			flexDirection: 'column'
		},
		contentContainer: {
			padding: 10,
		},
		wraperDoctorItem: {
			padding: 5,
		},
		doctorItem: {
			borderWidth: 1,
			width: 170,
			height: 60,
			borderRadius: 10,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: "white",
			padding: 4
		},
		selectDoctorItem: {
			backgroundColor: THEME.SELECT_COLOR,
			color: 'white',
			borderWidth: 0
		},
		doctorItemText: {
			textAlign: 'center',
			textAlignVertical: 'center',
			color: 'black',
			fontSize: 18,
			width: "100%",
			height: "100%",

		},
		selectdoctorItemText: {
			color: 'white',
			fontWeight: 'bold'
		},
		titleStyle: {
			fontSize: 12,
			marginLeft: 10,
			fontWeight: "normal"
		},
		periodSelection: {
			marginTop: 50,
		},
		subtitle: {
			fontSize: 10,
			fontFamily: 'Roboto',
			fontWeight: "bold"
		}
	}
)



