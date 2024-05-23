import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { HelperText, TextInput, Button, IconButton, Portal, Dialog } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import { useMyContextController } from '../store'; 

const AppointmentDetail = ({ navigation, route }) => {
    const { id } = route.params.item;
    const [controller, dispatch] = useMyContextController(); 
    const {userLogin} = controller
    const [datetime, setDatetime] = useState(new Date());
    const [appointment, setAppointment] = useState(null); 
    const [open, setOpen] = useState(false);
    const [serviceName, setServiceName] = useState('');
    const [servicePrice, setServicePrice] = useState('');
    const [serviceImage, setServiceImage] = useState('');
    const [visible, setVisible] = useState(false)
    const [state, setState] = useState('')
    const hideDialog = () => setVisible(false)
    const APPOINTMENTS = firestore().collection('APPOINTMENTS');
    const SERVICES = firestore().collection('SERVICES');

    useEffect(() => {
        const unsubscribe = APPOINTMENTS.doc(id).onSnapshot(response => {
            if(response.data() != null)
                {
                    setAppointment(response.data());
                    const { datetime } = response.data();
                    if(datetime != null)
                        {
                            const date = datetime.toDate();
                            setDatetime(date);
                        }
                    setState(response.data().state)
                   
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
        APPOINTMENTS.doc(id).delete().then(()=>navigation.navigate("Appointments"))
    }
    const handleUpdateAppointment = () => {
        APPOINTMENTS.doc(id).update({...appointment, customerID: userLogin.email, datetime: datetime})
        Alert.alert('Thông báo', 'Cập nhật lịch hẹn thành công')
        navigation.navigate('Appointments');
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
                <TouchableOpacity
                    onPress={() => setOpen(true)}
                    style={{ padding: 10, backgroundColor: state != "accept" && state != "reject" ? 'aqua':"whitesmoke", borderRadius: 10, marginVertical: 10 }}>
                   {datetime && <Text style={{ fontSize: 20 }}>Ngày hẹn: {datetime.toLocaleString()} </Text>} 
                </TouchableOpacity>
                {state != "accept" && state != "reject" && <Button mode="contained" style={styles.button} onPress={handleUpdateAppointment}>
                    Xác nhận
                </Button>}
                {appointment.state == "new" && <View style={{backgroundColor:'white',alignSelf:'center',borderColor:'gold',width:100, borderWidth:2, padding:8,alignItems:'center'}}><Text style={{color:'gold', fontSize:18, fontWeight:'bold'}}>PENDING</Text></View>} 
               {appointment.state == "accept" && <View style={{backgroundColor:'white',alignSelf:'center',borderColor:'lime',width:100, borderWidth:2, padding:8,alignItems:'center'}}><Text style={{color:'lime', fontSize:18, fontWeight:'bold'}}>ACCEPT</Text></View>} 
               {appointment.state == "reject" && <View style={{backgroundColor:'white',alignSelf:'center',borderColor:'red',width:100, borderWidth:2, padding:8,alignItems:'center'}}><Text style={{color:'red', fontSize:18, fontWeight:'bold'}}>REJECT</Text></View>} 
               {state != "accept" &&  <DatePicker
                    modal
                    open={open}
                    date={datetime}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDatetime(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                    />} 
             
              
               
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
        borderRadius: 5,
        marginBottom:15
    }
});

export default AppointmentDetail;
