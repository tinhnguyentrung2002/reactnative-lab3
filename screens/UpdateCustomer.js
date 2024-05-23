import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "react-native-paper";
import firestore from "@react-native-firebase/firestore"
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth"
const UpdateCustomer = ({ navigation, route }) => {
  const {email} = route.params.item
  const db = firestore().collection("USERS")
  const [customer, setCustomer] = useState({})
  useEffect(()=>{
    db.doc(email).onSnapshot(response => setCustomer(response.data()))
    },[])
    const handleUpdateStateCustomer = () =>{
            db.doc(email).update({...customer, state: customer.state =="Available"?"Lock":"Available"})
            if(customer.state == "Available") Alert.alert('Thông báo','Khóa tài khoản thành công')
            else Alert.alert('Thông báo','Mở khóa tài khoản thành công')
            //navigation.navigate("Customers")
    }
  var styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      padding: 15,
      alignItems: 'center'
    },
    textInput: {
      width:350,
      height:60,
      padding:10,
      marginTop:8,
      borderColor:"#e92c4c",
      borderWidth:0,
      borderRadius:8,
      backgroundColor:"whitesmoke"
    },
    // circleState: {
    //   backgroundColor: state=="available" ? "#f04663" : "gray",
    // },
    textValidContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      marginLeft: 15,
      marginTop: 5,
      marginBottom: 5
    },
    buttonText: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
      color: "white"
    }
  });

  return (
      <View style={styles.container}>
        <Text style={{textAlign:'center', fontSize:24, fontWeight:'bold', marginBottom: 10}}>Thông tin chi tiết</Text>
        <Text style={{alignSelf:'flex-start', marginTop:10, marginLeft:15}}>Trạng thái tài khoản: <Text style={{color:customer.state=="Available"?"lime":"red"}}>  {customer.state}</Text></Text>
        <View style={{flexDirection:'column', marginTop:10}}>
            <Text>Họ và tên</Text>
            <TextInput
                editable={false}
                value={customer.fullName}
                style={styles.textInput}
                placeholder="Họ và tên"
            />
        </View>
        <View style={{flexDirection:'column', marginTop:10}}>
            <Text>Số điện thoại</Text>
            <TextInput
          editable={false}
          value={customer.phone}
          style={styles.textInput}
          placeholder="Số điện thoại"
          keyboardType="numeric"
        />
        </View>
        <View style={{flexDirection:'column', marginTop:10}}>
            <Text>Email</Text>
            <TextInput
          editable={false}
          value={customer.email}
          style={styles.textInput}
          placeholder="Email"
        />
        </View>
        
        <TouchableOpacity onPress={handleUpdateStateCustomer} style={{marginTop:20, marginRight: 20 ,borderWidth:1, borderColor:customer.state=="Available"? "lime": "red", borderRadius:10, padding:5}}>
         <Icon size={40} color={customer.state=="Available"? "lime": "red"} source={customer.state=="Available"? "lock-open": "lock"}/>
        </TouchableOpacity>

      </View>
  );
}

export default UpdateCustomer;
