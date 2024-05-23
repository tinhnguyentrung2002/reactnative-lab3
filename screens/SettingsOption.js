import { logout, useMyContextController } from "../store"
import { Button, HelperText } from "react-native-paper"
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "react-native-paper";
import firestore from "@react-native-firebase/firestore"
import { Alert } from "react-native";

const SettingsOption = ({navigation}) =>{
    const phonePattern = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const [customer, setCustomer] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [isConfirm, setIsConfirm] = useState(true)
    const [phoneError, setPhoneError] = useState(false);
    useEffect(() => {

    setPhoneError(!phonePattern.test(customer.phone));
    }, [customer.phone]);
    const hasErrorName = () => customer.fullName == ""

    const handleLogout = () =>{
        logout(dispatch)
    }
    const db = firestore().collection("USERS")

    useEffect(()=>{
        
        if(userLogin == null) navigation.navigate("Login")
    }, [userLogin])
    useEffect(()=>{
        navigation.setOptions({
            headerLeft: null,
          });
        db.doc(userLogin.email).onSnapshot(response => setCustomer(response.data()))
        },[])
    const editMode = () =>{
        setIsEdit(true)
    }
    const cancelEditMode = () =>{
        setIsEdit(false)
        db.doc(userLogin.email).onSnapshot(response => setCustomer(response.data()))
    }
    const handleUpdateProfile = () =>{
       
        db.doc(userLogin.email).update({...customer})
        Alert.alert('Thông báo', 'Cập nhật thông tin thành công')
        setIsEdit(false)
        
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
    return(
        <View style={styles.container}>
             <Text style={{textAlign:'center', fontSize:24, fontWeight:'bold', marginBottom: 10}}>Thông tin cá nhân</Text>
        <View style={{flexDirection:'column'}}>
            <Text>Họ và tên</Text>
            <TextInput
                editable={isEdit}
                onChangeText={(text) => setCustomer({...customer, fullName: text})}
                value={customer.fullName}
                style={styles.textInput}
                placeholder="Họ và tên"
            />
                   <HelperText type="error" visible={hasErrorName() && isEdit}>Họ tên không được để trống</HelperText>
        </View>
        <View style={{flexDirection:'column'}}>
            <Text>Số điện thoại</Text>
            <TextInput
          editable={isEdit}
          value={customer.phone}
          onChangeText={(text) => setCustomer({...customer, phone: text})}
          style={styles.textInput}
          placeholder="Số điện thoại"
          keyboardType="numeric"
        />
       <HelperText type="error" visible={phoneError && isEdit}>Số điện thoại sai định dạng</HelperText>
        </View>
        <View style={{flexDirection:'column'}}>
            <Text>Email</Text>
            <TextInput
          editable={false}
          value={customer.email}
          style={styles.textInput}
          placeholder="Email"
        />
        </View>
        <View style={{flexDirection:'row'}}>
        {isEdit != false && <TouchableOpacity disabled={hasErrorName() || phoneError} onPress={handleUpdateProfile} style={{ width: 150,
         marginTop:15,
         padding: 10,
         backgroundColor: (hasErrorName() || phoneError)? "grey": '#f04663',
         borderRadius: 5}}><Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>Xác nhận</Text></TouchableOpacity>} 
          {isEdit != false && <TouchableOpacity onPress={cancelEditMode} style={{ width: 150,
         marginTop:15,
         padding: 10,marginLeft:20,
         backgroundColor: '#f04663',
         borderRadius: 5}}><Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>Hủy</Text></TouchableOpacity>} 
        </View>
        {isEdit != true && <TouchableOpacity onPress={editMode} style={{ width: 350,
         marginTop:25,
         padding: 10,
         backgroundColor: '#f04663',
         borderRadius: 5}}><Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>Chỉnh sửa thông tin</Text></TouchableOpacity>} 
        {isEdit != true && <TouchableOpacity onPress={()=>navigation.navigate("ChangePassword")} style={{width: 350,
         marginTop:7,
         padding: 10,marginTop:10,
         backgroundColor: '#f04663',
         borderRadius: 5}}><Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>Đổi mật khẩu</Text></TouchableOpacity>} 
         {isEdit != true && <TouchableOpacity onPress={handleLogout} style={{ width: 350,
         marginTop:7,
         padding: 10,marginTop:10,
         backgroundColor: '#f04663',
         borderRadius: 5}}><Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>Đăng xuất</Text></TouchableOpacity>}   
        </View>
    )
}
export default SettingsOption