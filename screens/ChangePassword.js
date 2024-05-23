import React from 'react';
import { View, TextInput,Alert, StyleSheet, TouchableOpacity} from 'react-native';
import { Button, Dialog, HelperText, Portal, Text } from "react-native-paper"
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import {logout,  useMyContextController } from '../store';
const ChangePassword = () => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const hasErrorPass = () => newPass.length < 6
  const [controller, dispatch] = useMyContextController()
 
  const reauthenticate = () => {
    const user = auth().currentUser;
    const credential = auth.EmailAuthProvider.credential(user.email, currentPass);
    return user.reauthenticateWithCredential(credential);
  };

  const handleChangePassword = () => {
    reauthenticate()
      .then(() => {
        return auth().currentUser.updatePassword(newPass);
      })
      .then(() => {
        Alert.alert('Thành công', 'Cập nhật mật khẩu thành công, vui lòng đăng nhập lại');
        logout(dispatch)
      })
      .catch(error => {
        Alert.alert('Lỗi', "Đổi mật khẩu thất bại" + error.message);
      });
  };
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
      <TextInput style={styles.textInput}
        value={currentPass}
        onChangeText={text => setCurrentPass(text)}
        placeholder="Nhập mật khẩu hiện tại"
        secureTextEntry
      />
      <TextInput style={styles.textInput}
        value={newPass}
        onChangeText={text => setNewPass(text)}
        placeholder="Nhập mật khẩu mới"
        secureTextEntry
      />
      <HelperText style={{alignSelf:'flex-start', marginLeft:3, marginTop:5}} type="error" visible={hasErrorPass()}>Mật khẩu mới phải từ 6 kí tự trở lên</HelperText>
      <TouchableOpacity disabled={hasErrorPass()} onPress={handleChangePassword} style={{ width: 350,
         marginTop:5,
         padding: 10,
         backgroundColor: hasErrorPass()?"grey":'#f04663',
         borderRadius: 5}}><Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>Xác nhận</Text></TouchableOpacity>
    </View>
  );
};

export default ChangePassword;