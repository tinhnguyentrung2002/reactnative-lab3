import { useEffect, useState } from "react"
import firestore from "@react-native-firebase/firestore"
import { View, Image, Text, FlatList, TouchableOpacity } from "react-native"
import { Icon, IconButton, TextInput } from "react-native-paper"
const CustomerManager = ({navigation}) =>{
    const [customers, setCustomers] = useState([])
    const cCUSTOMERS = firestore().collection("USERS")
    const [customersData, setCustomersData] = useState([])
    const [keyword,setKeyWord] = useState("")
    useEffect(()=>{
        navigation.setOptions({
            headerLeft: null,
           
          });
        cCUSTOMERS.onSnapshot(response => {
            var arr = []
            response.forEach(doc => ((doc.data().email!= null) && arr.push(doc.data())))
            setCustomers(arr)
            setCustomersData(arr)
        })
    },[])
    const renderItem = ({item}) =>{
        const {fullName, phone, role, email, state} = item
        return(
         (role != 'admin') && (<TouchableOpacity onPress={() => navigation.navigate("UpdateCustomer", {item: item})} style={{flexDirection:"row", borderWidth:1, height:100, borderWidth: 1, backgroundColor:'white',borderColor:'#e92c4c' ,borderRadius: 10, margin:5, justifyContent:"space-between", alignItems:"center", padding:10}}>
                   <View style={{flexDirection:'column'}}>
                        <Text style={{fontSize:18, fontWeight:'bold', marginTop:4}}>{fullName}</Text>
                        <Text style={{fontStyle:'italic', color:'gray', marginTop:2}}><Icon source={'email'} /> - {email}</Text>
                        <Text style={{fontStyle:'italic', color:'gray', marginTop:2}}><Icon source={'phone'} /> - {phone}</Text>
                   </View>
                   <Text style={{color:state =="Available"?'lime':'red'}}><Icon color={state =="Available"?'lime':'red'} source={"circle"}/> {state}</Text>
          
            </TouchableOpacity>)
        )
    }
    useEffect(()=>{
        setCustomersData(customers.filter(s => s.fullName.toUpperCase().trim().includes(keyword.toUpperCase().trim()) || 
                                               s.email.toUpperCase().trim().includes(keyword.toUpperCase().trim()) ||
                                               s.phone.toUpperCase().trim().includes(keyword.toUpperCase().trim())))       
    },[keyword])
    return(
        <View style={{flex:1}}>
            <Image style={{alignSelf:"center", marginVertical:50}} source={require("../assets/logo.png")} />
            <TextInput label={"Search customer by keyword"} style={{margin:10}} value={keyword} onChangeText={setKeyWord}/>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <Text style={{
                    fontSize:24,
                    marginTop:15,
                    marginLeft:5,
                    fontWeight:'bold'
                }}>
                    Danh sách khách hàng
                </Text>
                {/* <IconButton icon={"plus-circle"} iconColor="red" size={40} onPress={()=>{navigation.navigate("UpdateCustomer")}}/> */}
            </View>
            <FlatList data={customersData} keyExtractor={item => item.email} renderItem={renderItem}/>
        </View>
    )
}
export default CustomerManager