import { useEffect, useState } from "react"
import firestore from "@react-native-firebase/firestore"
import { View, Image, Text, FlatList, TouchableOpacity } from "react-native"
import { IconButton, TextInput } from "react-native-paper"
import { useMyContextController } from "../store"
import { element } from "prop-types"
const Appointments = ({navigation}) =>{
    const [appointments, setAppointments] = useState([])
    const cAppointments = firestore().collection("APPOINTMENTS")
    const SERVICES = firestore().collection("SERVICES")
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller
    useEffect(()=>{
        navigation.setOptions({
            headerLeft: null,
           
          });
        cAppointments.where("customerID" , "==",  userLogin.email).onSnapshot(response => {
            var arr = []
            response.forEach(doc => ((doc.data().id!= null) && arr.push(doc.data())))
            setAppointments(arr)
       
        }) 
        
    },[])
    const renderItem = ({item}) =>{
   
        const {id, serviceID ,state, datetime} = item
        const date = datetime.toDate();
        const convert = date.toLocaleString();
       
        return(
            <TouchableOpacity onPress={() => navigation.navigate("AppointmentDetail", {item: item})} style={{flexDirection:"row" , justifyContent:'space-between', height:80,borderWidth: 1, backgroundColor:'white',borderColor:'#e92c4c' ,borderRadius: 10, margin:5, alignItems:"center", padding:10}}>
                <View style={{flexDirection:'column'}}>
                    <Text style={{fontSize:18}}>Lịch hẹn {convert}</Text>
                </View>
                {state =="accept"?<Text style={{fontSize:18, color:"lime"}}>Accept</Text>: state =="new"? <Text style={{fontSize:18, color:"gold"}}>Pending</Text> :<Text style={{fontSize:18, color:"red"}}>Reject</Text>}
            </TouchableOpacity>
        )
    }
    return(
        <View style={{flex:1}}>
            <Image style={{alignSelf:"center", marginVertical:50}} source={require("../assets/logo.png")} />
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Text style={{
                    fontSize:24,
                    marginLeft:5,
                    fontWeight:'bold'
                }}>
                    Danh sách lịch hẹn
                </Text>
                <IconButton icon={"plus-circle"} iconColor="red" size={40} onPress={()=>{navigation.navigate("RouterCustomer")}}/>
            </View>
            <FlatList  data={appointments} keyExtractor={item => item.id} renderItem={renderItem}/>
        </View>
    )
}
export default Appointments