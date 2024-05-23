import { useEffect, useState } from "react"
import firestore from "@react-native-firebase/firestore"
import { View, Image, Text, FlatList, TouchableOpacity } from "react-native"
import { IconButton, TextInput } from "react-native-paper"
const ServicesCustomer = ({navigation}) =>{
    const [services, setServices] = useState([])
    const cSERVICES = firestore().collection("SERVICES")
    const [servicesData, setServicesData] = useState([])
    const [name,setName] = useState("")
    useEffect(()=>{
        navigation.setOptions({
            headerLeft: null,
           
          });
        cSERVICES.onSnapshot(response => {
            var arr = []
            response.forEach(doc => ((doc.data().id!= null) && arr.push(doc.data())))
            setServices(arr)
            setServicesData(arr)
        })
    },[])
    const renderItem = ({item}) =>{
        const {serviceName, price, image} = item
        return(
            <TouchableOpacity onPress={() => navigation.navigate("AddNewAppointment", {item: item})} style={{flexDirection:"row" ,height:70 , margin:5, justifyContent:"space-between", alignItems:"center", padding:10}}>
                <View style={{flexDirection:'column'}}>
                    <Text style={{fontSize:19, color:'black'}}>{serviceName}</Text>
                    <Text style={{color:'#E92c4c'}}>Giá: {price}đ</Text>
                </View>
                {((image && <Image source={{uri: image}} style={{height:60, width:60, borderRadius:12}}/>))}
                
            </TouchableOpacity>
        )
    }
    useEffect(()=>{
        setServicesData(services.filter(s => s.serviceName.toUpperCase().trim().includes(name.toUpperCase().trim())))       
    },[name])
    return(
        <View style={{flex:1}}>
            <Image style={{alignSelf:"center", marginVertical:50}} source={require("../assets/logo.png")} />
            <TextInput label={"Search service by name"} style={{margin:10 }} mode="outlined" value={name} onChangeText={setName}/>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Text style={{
                    fontSize:24,
                    marginLeft:5,
                    color:'#E92c4c',
                    fontWeight:'bold'
                }}>
                    Danh sách dịch vụ
                </Text>
            </View>
            <FlatList data={servicesData} keyExtractor={item => item.id} renderItem={renderItem}/>
        </View>
    )
}
export default ServicesCustomer