import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { HelperText, TextInput, Button, IconButton, Portal, Dialog, Icon } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import { useMyContextController } from '../store'; 

const AppointmentDetailAdmin = ({ navigation, route }) => {
    const { id } = route.params.item;
    const [controller, dispatch] = useMyContextController(); 
    const {userLogin} = controller
    const [datetime, setDatetime] = useState(new Date());
    const [appointment, setAppointment] = useState(null); 
    const [serviceName, setServiceName] = useState('');
    const [servicePrice, setServicePrice] = useState('');
    const [serviceImage, setServiceImage] = useState('');
    const [users, setUSERS] = useState({})
    const [visible, setVisible] = useState(false)
    const hideDialog = () => setVisible(false)
    const APPOINTMENTS = firestore().collection('APPOINTMENTS');
    const SERVICES = firestore().collection('SERVICES');
    const USERS = firestore().collection("USERS")
    useEffect(() => {
        const unsubscribe = APPOINTMENTS.doc(id).onSnapshot(response => {
            if(response.data() != null)
                {
                    const apppointmentData = response.data();
                    setAppointment(apppointmentData);
                    let userID = apppointmentData.customerID
                  
                    if (apppointmentData) {
                        const userID = apppointmentData.customerID;
                        USERS.doc(userID).onSnapshot(userResponse => {
                            setUSERS(userResponse.data());
                            // console.log(userResponse.data().fullName);
                        });
                    }
                    const { datetime } = response.data();
                    if(datetime != null)
                        {
                            const date = datetime.toDate();
                            setDatetime(date);
                        }
                   
                    SERVICES.doc(response.data().serviceID).onSnapshot(response => {
                        const { serviceName, price, image } = response.data();
                        setServiceName(serviceName);
                        setServicePrice(price);
                        setServiceImage(image);
                    });
                }
            
        });


        return () => unsubscribe();
    }, [id]); 

   
    const handleDeleteAppointment = () =>{
        APPOINTMENTS.doc(id).delete().then(()=>navigation.navigate("Transactions"))
    }
    const handleAcceptAppointment = () => {
        APPOINTMENTS.doc(id).update({...appointment, state:"accept"})
        // navigation.navigate('Transactions')
    };
    const handleRejectAppointment = () => {
        APPOINTMENTS.doc(id).update({...appointment, state:"reject"})
        // navigation.navigate('Transactions')
    };
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: (props) => <IconButton icon={"delete"} {...props} onPress={() => setVisible(true)} />
        })
    
    },[])

    return (
        appointment && (
            <View style={{ flex: 1, padding: 10 }}>
                {serviceImage && <Image source={{ uri: serviceImage }} style={{ height: 300 }} />}
                <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>Service Name: {serviceName}</Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>Price: {servicePrice}đ</Text>
                <Text style={{ fontSize: 20, margin: 10 }}>Người đặt: {users.fullName}</Text>
                <Text style={{ fontSize: 20, margin: 10 }}>Email: {appointment.customerID}</Text>
                <TouchableOpacity
                    style={{ padding: 10, backgroundColor: 'whitesmoke', borderRadius: 10 }}>
                   {datetime && <Text style={{ fontSize: 20 }}>Ngày hẹn: {datetime.toLocaleString()} </Text>} 
                </TouchableOpacity>
               {appointment.state == "new" && <View style={{flexDirection:'row', alignSelf:'center'}}><TouchableOpacity onPress={handleAcceptAppointment} style={{borderColor: 'grey', borderWidth:1, borderRadius:12, backgroundColor:'lime', marginRight:10}}><Icon color="white" size={30} source={'check'}/></TouchableOpacity><TouchableOpacity onPress={handleRejectAppointment}  style={{borderColor: 'grey', borderWidth:1, borderRadius:12, backgroundColor:'red'}}><Icon color="white" size={30} source={'close'}/></TouchableOpacity></View>} 
               {appointment.state == "accept" && <View style={{backgroundColor:'white',alignSelf:'center',borderColor:'lime',width:100, borderWidth:2, padding:8,alignItems:'center'}}><Text style={{color:'lime', fontSize:18, fontWeight:'bold'}}>ACCEPT</Text></View>} 
               {appointment.state == "reject" && <View style={{backgroundColor:'white',alignSelf:'center',borderColor:'red',width:100, borderWidth:2, padding:8,alignItems:'center'}}><Text style={{color:'red', fontSize:18, fontWeight:'bold'}}>REJECT</Text></View>} 
             
             <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Confirm Delete Appoinment</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Do you want to delete appoinment?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>No</Button>
                        <Button onPress={handleDeleteAppointment}>Yes</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 7,
        padding: 10,
        backgroundColor: '#f04663',
        borderRadius: 5
    }
});

export default AppointmentDetailAdmin;
