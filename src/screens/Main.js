import React, { useContext, useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ListItem, SearchBar, CheckBox, Divider, Button } from 'react-native-elements'
import { ReceptionContext } from '../context/reception/ReceptionContext';
import { EmptyListMessage } from '../components/EmptyListMessage';
import { THEME } from '../themes';
import { AppInputDate } from '../components/ui/AppInputDate';
import moment from 'moment';
import { TextError } from '../components/TextError';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import Swipeable from 'react-native-gesture-handler/Swipeable';


export const Main = ({ navigation, route }) => {

	const { getDoctorsSchedule, doctorsSchedule, errorSchedule,
		loadingDoctorsSchedule, doctors, sort, openPatient, date, setFild, fDoctor, fNamePatient} = useContext(ReceptionContext);



	React.useLayoutEffect(() => {

		let doctor = doctors.find(item => item.guid == fDoctor);
		let name = "";
		if (doctor) {
			name = doctor.name;
		} else {
			name = "Все";
		}
		navigation.setOptions({
			title: name,
			headerTitleStyle: {
				fontSize: 16,
			},
		});

	}, [route, fDoctor, doctors]);



	useEffect(() => {
		hendlerGetDoctorsSchedule();
	}, [date]);

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

		openPatient(item.patient, item.medicalCard, navigation)

	}



	let rowSwipeable = [];

	const closeRowSwipeable = (index) => {

		rowSwipeable[index].close();
	}

	const getBackgroundStyle = (item) => {

		if (!item.medicalCard.guid) {
			return { backgroundColor: "#DADADA" };
		} if (item.serviceCompleted === true) {
			return { backgroundColor: "#e2f0e1" };
		} else {
			return {};
		}

	}

	const renderItem = ({ index, item }) => (

		<Swipeable
			ref={ref => rowSwipeable[index] = ref}
			renderLeftActions={() =>
				item.service.guidService != '' ?
					<View style={{
						backgroundColor: 'green', width: "100%", flexDirection: 'row',
						justifyContent: 'flex-start',
						alignItems: 'center',
						flex: 1
					}}>
						<Button
							icon={{ name: 'camera', color: "white", backgroundColor: 'green', size: 30 }}
							buttonStyle={{ minHeight: '100%', backgroundColor: 'green' }} />
					</View> : <></>
			}
			onSwipeableOpen={() => {

				closeRowSwipeable(index);

				if (item.medicalCard.guid === "") {
					Alert.alert("Внимание", "Карта пациента не зарегистрирована");
					return;
				}

				if (item.service.guidService == '') {
					Alert.alert("Внимание", "Не определена услуга");
					return;
				} else {
					setFild("currentService", item.service);
					setFild("currentPatient", item.patient);


					navigation.navigate('AppCamera');
				}

			}}
		>
			<ListItem key={item.guid} onPress={() => { onPressScheduleItem(item) }}
				bottomDivider
				topDivider
				containerStyle={getBackgroundStyle(item)}>

				{item.visitRegistered && <IconFontisto
					name={"check"}
					size={20}
					color={"green"}
				/>}

				<ListItem.Content>

					<ListItem.Title  >
						{item.timeOfReceipt} {item.presentationPatient}
					</ListItem.Title>

					<ListItem.Subtitle style={{ fontSize: 10, fontFamily: 'Roboto', fontWeight: "bold" }}>
						{item.nomenclature.name}
					</ListItem.Subtitle>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem>
		</Swipeable>
	);

	return (
		<View style={{ flex: 1, backgroundColor: "white", padding: 2 }}>

			<View style={{ paddingLeft: 6, paddingRight: 6, backgroundColor: "white", justifyContent: "space-between", marginTop: 10, marginBottom: 10, flexDirection: 'row' }}>
				<AppInputDate textStyle={{ fontSize: 20 }} date={date} setDate={(value) => { setFild("date", value) }} showTime={false} />

			

				<Button title="Медицинский документ" onPress={()=>{navigation.navigate('MedicalDocument')}}/>



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

			<FlatList

				data={doctorsSchedule.filter(item => useFilter(item))}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
				onRefresh={() => hendlerGetDoctorsSchedule()}
				refreshing={loadingDoctorsSchedule}
				ListEmptyComponent={<EmptyListMessage loading={loadingDoctorsSchedule} />}

			/>
		</View>
	);
}


const styles = StyleSheet.create(
	{
		titleStyle: {
			fontSize: 12,
			marginLeft: 10,
			fontWeight: "normal"
		},
		periodSelection: {
			marginTop: 50,
		},
	}
)

