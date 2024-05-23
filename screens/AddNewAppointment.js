import { useLayoutEffect, useState, useEffect } from "react"
import { useMyContextController } from "../store"
import firestore from "@react-native-firebase/firestore"
import { View,Alert, StyleSheet, Image} from "react-native"
import { HelperText, TextInput , Button, IconButton, Portal, Dialog, Text } from "react-native-paper"
import { launchImageLibrary } from "react-native-image-picker"
import storage from "@react-native-firebase/storage"
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker'
import { TouchableOpacity } from "react-native-gesture-handler"
const AddNewAppointment = ({navigation, route}) => {
    const {id} = route.params.item
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const [datetime, setDatetime] = useState( new Date())
    const [service, setService] = useState({})
    const [open, setOpen] = useState(false)
    const SERVICES = firestore().collection("SERVICES")
    useEffect(()=>{
        SERVICES.doc(id).onSnapshot(response => setService(response.data()))
    },[])
   const APPOINTMENTS = firestore().collection("APPOINTMENTS")
   const handleAddNewAppointment =()=>{
        APPOINTMENTS.add({
            customerID: userLogin.email,
            serviceID: id,
            datetime,
            state:"new"

        }).then(response => APPOINTMENTS.doc(response.id).update({id: response.id}))
        navigation.navigate("Appointments")
   }
   
    return(
        (service != null ) && 
        <View style={{flex: 1, padding:10}}>
            {((service.image && <Image source={{uri: service.image}} style={{height:300}}/>))}
            <Text style={{fontSize:24, fontWeight:'bold', margin:10}}>
                Service Name: {service.serviceName}
            </Text>
            <Text style={{fontSize:24, fontWeight:'bold', margin:10}}>
                Price: {service.price}
            </Text>
            <TouchableOpacity onPress={()=>setOpen(true)} style={{padding:10, backgroundColor:"aqua", borderRadius:10, marginVertical:10}}>
                <Text style={{fontSize:20}}>
                    Choose date time: {datetime.toLocaleString()}
                </Text>
            </TouchableOpacity>
            <Button mode="contained" style={Style.button}  onPress={handleAddNewAppointment}>Add New Appointment</Button>
            <DatePicker
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
            />
        </View>
    )
}
var Style = StyleSheet.create({
    button:{
        marginTop:7,
        padding: 10,
        backgroundColor: '#f04663',
        borderRadius: 5
      
    },

})
export default AddNewAppointment