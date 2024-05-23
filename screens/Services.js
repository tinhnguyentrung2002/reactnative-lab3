import { useEffect, useState } from "react"
import firestore from "@react-native-firebase/firestore"
import { View, Image, Text, FlatList, TouchableOpacity } from "react-native"
import { IconButton, TextInput } from "react-native-paper"
const Services = ({navigation}) =>{
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
        const {serviceName, price} = item
        return(
            <TouchableOpacity onPress={() => navigation.navigate("ServiceDetail", {item: item})} style={{flexDirection:"row", borderWidth:1, height:60, borderWidth: 1, backgroundColor:'white',borderColor:'#e92c4c' ,borderRadius: 10, margin:5, justifyContent:"space-between", alignItems:"center", padding:10}}>
                <Text style={{fontSize:18}}>{serviceName}</Text>
                <Text>{price}đ</Text>
            </TouchableOpacity>
        )
    }
    useEffect(()=>{
        setServicesData(services.filter(s => s.serviceName.toUpperCase().trim().includes(name.toUpperCase().trim())))       
    },[name])
    return(
        <View style={{flex:1}}>
            <Image style={{alignSelf:"center", marginVertical:50}} source={require("../assets/logo.png")} />
            <TextInput label={"Search service by name"} style={{margin:10}} value={name} onChangeText={setName}/>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Text style={{
                    fontSize:24,
                    marginLeft:5,
                    fontWeight:'bold'
                }}>
                    Danh sách dịch vụ
                </Text>
                <IconButton icon={"plus-circle"} iconColor="red" size={40} onPress={()=>{navigation.navigate("AddNewService")}}/>
            </View>
            <FlatList data={servicesData} keyExtractor={item => item.id} renderItem={renderItem}/>
        </View>
    )
}
export default Services