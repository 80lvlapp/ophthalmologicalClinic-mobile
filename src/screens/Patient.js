import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Linking, Alert} from 'react-native';
import { Card, Text, ListItem, Divider } from 'react-native-elements';
import { ReceptionContext } from '../context/reception/ReceptionContext';
import { THEME } from '../themes';
import { TextError } from '../components/TextError';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { EmptyListMessage } from '../components/EmptyListMessage';

export const callNumber = phone => {
	let phoneNumber = phone;
	phoneNumber = `tel:${phone}`;
	return Linking.openURL(phoneNumber);
  };

export const Patient = ({ navigation, route }) => {

	const { currentPatient, openHTML, loadingServices, services, errorServices, getServices, openPatientGallery, currentMedicalCard, setFild, openService, patientParameters } = useContext(ReceptionContext);
	const [groupIsOpen, setGroupIsOpen] = React.useState(false);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: 'История пациента',
		});
	}, [route]);

	const renderItem = ({ item }) => (
		<ListItem key={item.number} bottomDivider topDivider onPress={() => {
			openService(item, navigation)
		}} containerStyle={{ paddingHorizontal: 0 }}>

			<View style={{ flexDirection: 'column' }}>

				{item.thereArePhotos && <Icon
					name={"image"}
					size={20}
					color={"green"}
				/>}

				{item.medicalDocument.guid != "" && <IconIonicons
					name={"ios-document-attach-outline"}
					size={20}
					color={"green"}
				/>}

			</View>

			<ListItem.Content >

				<ListItem.Title>
					{item.presentationDate}  {item.nomenclature.name}
				</ListItem.Title>

				<ListItem.Subtitle>
					Врач: {item.employee.name + "\n"}
					{item.comment}
				</ListItem.Subtitle>
			</ListItem.Content>
			<ListItem.Chevron />
		</ListItem>
	);


	return (


		<View style={{ flex: 1, backgroundColor: "white", padding: 4}}>

			<View style={{
				flexDirection: 'row',
				alignItems: "center",
				alignContent: "space-between",
				justifyContent: "space-around",
			

			}}>


				<TouchableOpacity onPress={() => openPatientGallery(navigation, "PatientGallery")} style={{ paddingTop: 12, paddingBottom: 4 }}>
					<View style={{ flexDirection: 'column', alignItems: "center" }}>
						<Icon
							name='images'
							size={30}
							color={THEME.BUTTON_COLOR}
						/>

						<Text h7 style={{ fontSize: 10 }}>Галерея пациента</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => openPatientGallery(navigation, "PatientFavoritesGallery")} style={{ paddingTop: 12, paddingBottom: 4 }}>
					<View style={{ flexDirection: 'column', alignItems: "center" }}>
						<IconMaterialCommunityIcons
							name='view-gallery-outline'
							size={30}
							color={THEME.BUTTON_COLOR}
						/>
						<Text h5 style={{ fontSize: 10 }}>Галереия до и после</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {
					openHTML(navigation, {
						typeHTML: "emk",
						guidMedicalCard: currentMedicalCard.guid
					}, 'Медицинская карта')
				}} style={{ paddingTop: 12, paddingBottom: 4 }}>

					<View style={{ flexDirection: 'column', alignItems: "center" }}>
						<IconAntDesign
							name='medicinebox'
							size={30}
							color={THEME.BUTTON_COLOR}
						/>
						<Text h5 style={{ fontSize: 10 }}>Медицинская карта</Text>
					</View>
				</TouchableOpacity>
			</View>

			<Divider />

			<ListItem.Accordion

				content={
					<>
						<ListItem.Content>
							<ListItem.Title>{currentPatient.name}</ListItem.Title>
						</ListItem.Content>
					</>
				}
				isExpanded={groupIsOpen}
				onPress={() => { setGroupIsOpen((prev) => { return !prev }) }}

				containerStyle={{ margin: 0, 	paddingHorizontal: 10}}
			>
				{patientParameters.map((itemParam, i) => (
					<ListItem bottomDivider
					 topDivider key={itemParam.name}  
					 containerStyle={{ margin: 0, paddingVertical:2, paddingHorizontal: 10, backgroundColor: "#E0FFFF" }}
					 onPress= {itemParam.type=='tel'? ()=>{callNumber(itemParam.value)}:null}>
					
						
						<ListItem.Content containerStyle={{ margin: 0, paddingHorizontal: 0 }}>
							<ListItem.Title>{itemParam.name}</ListItem.Title>
							<ListItem.Subtitle>{itemParam.value}</ListItem.Subtitle>
						</ListItem.Content>

						{(itemParam.type=='tel') && 
						<IconIonicons
						name='md-call-outline'
						size={20}
						color={THEME.BUTTON_COLOR}
					/>
						}
						
					</ListItem>))}

			</ListItem.Accordion>

			{errorServices !== "" && <TextError textError={errorServices} />}

			<FlatList

				data={services}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
				onRefresh={() => getServices(currentPatient.guid)}
				refreshing={loadingServices}
				ListEmptyComponent={<EmptyListMessage loading={loadingServices}

				/>}
			/>
		</View>

	);
}


const styles = StyleSheet.create(
	{
		titleStyle: {
			fontSize: 12,
			color: '#9c9c9c',
			marginLeft: 10
		},
	}
)

