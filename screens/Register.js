import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { Checkbox, Icon } from "react-native-paper";
import { useMyContextProvider, createAccount } from '../store/index'; 
import { useNavigation } from '@react-navigation/native';
const Register = ({ navigation }) => {
  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const [errorFullname, setErrorFullname] = useState(false);
  const [errorPhone, setPhoneError] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorRepassword, setErrorRepassword] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  useEffect(() => {
    if (fullname.length == 0) {
      setErrorFullname(true);
    } else {
      setErrorFullname(false);
    }

    if(phone.length != 10)
    {
        setPhoneError(true)
    }else{
        const phonePattern = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
        if(!phonePattern.test(phone))
            {
                setPhoneError(true)
            }
            else  setPhoneError(false);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(username)) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    if (password.length < 6) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
    if (password === repassword && password.length >= 6) {
      setErrorRepassword(false);
    } else {
      setErrorRepassword(true);
    }

    
    if (fullname.length === 0 || !emailPattern.test(username) || password.length < 6 || password !== repassword) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  }, [fullname, username, password, repassword, phone]);
  const onPress = () => {

    createAccount( username, password, fullname, phone,"customer","Available");
    navigation.navigate('Login',{email: username})
}

  var styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      padding: 15,
      justifyContent:'center',
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
    button: {
      width: 350, 
      backgroundColor: buttonState ? "#f04663" : "gray",
      marginTop: 15,
      padding: 10,
    },
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
    <ScrollView style={{flex:1, marginTop:50, backgroundColor: 'white'}}>
 <View style={styles.container}>
        <Text style={{textAlign:'center', fontSize:50,color:'#E92c4c', fontWeight:'bold', marginBottom: 10}}>Đăng ký</Text>
        <TextInput
          value={fullname}
          onChangeText={setFullName}
          style={styles.textInput}
          placeholder="Họ và tên"
        />
        <View style={styles.textValidContainer}>
          <Icon source={errorFullname ? "alert-circle" : "check-circle"} color={errorFullname ? "red" : "green"} size={20} />
          <Text style={{ marginLeft: 5, color: errorFullname ? "red" : "green" }}>Tên không được bỏ trống</Text>
        </View>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.textInput}
          placeholder="Số điện thoại"
          keyboardType="numeric"
        />
        <View style={styles.textValidContainer}>
          <Icon source={errorPhone ? "alert-circle" : "check-circle"} color={errorPhone ? "red" : "green"} size={20} />
          <Text style={{ marginLeft: 5, color: errorPhone? "red" : "green" }}>Số điện thoại hợp lệ</Text>
        </View>
        <TextInput
          value={username}
          onChangeText={setUserName}
          style={styles.textInput}
          placeholder="Email"
        />
        <View style={styles.textValidContainer}>
          <Icon source={errorEmail ? "alert-circle" : "check-circle"} color={errorEmail ? "red" : "green"} size={20} />
          <Text style={{ marginLeft: 5, color: errorEmail ? "red" : "green" }}>Email đúng định dạng</Text>
        </View>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
          secureTextEntry={!showPassword}
          placeholder="Nhập mật khẩu"
        />
        <View style={styles.textValidContainer}>
          <Icon source={errorPassword ? "alert-circle" : "check-circle"} color={errorPassword ? "red" : "green"} size={20} />
          <Text style={{ marginLeft: 5, color: errorPassword ? "red" : "green" }}>Mật khẩu từ 6 kí tự trở lên</Text>
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', marginTop: 8, marginLeft: 8 }}>
          <Checkbox
            onPress={() => setShowPassword(!showPassword)}
            status={showPassword ? "checked" : "unchecked"}
            style={{ marginRight: 10, }}
          />
          <Text onPress={() => setShowPassword(!showPassword)}>Hiển thị mật khẩu</Text>
        </View>
        <TextInput
          value={repassword}
          onChangeText={setRepassword}
          style={styles.textInput}
          secureTextEntry={!showRepassword}
          placeholder="Xác nhận mật khẩu"
        />
        <View style={styles.textValidContainer}>
          <Icon source={errorRepassword ? "alert-circle" : "check-circle"} color={errorRepassword ? "red" : "green"} size={20} />
          <Text style={{ marginLeft: 5, color: errorRepassword ? "red" : "green" }}>Nhập lại mật khẩu</Text>
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', marginTop: 8, marginLeft: 8 }}>
          <Checkbox
            onPress={() => setShowRepassword(!showRepassword)}
            status={showRepassword ? "checked" : "unchecked"}
            style={{ marginRight: 10, }}
          />
          <Text onPress={() => setShowRepassword(!showRepassword)}>Hiển thị mật khẩu</Text>
        </View>
        <TouchableOpacity
          disabled={!buttonState}
          onPress={onPress}
          style={styles.button}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate('Login')} style={{ color: '#E92c4c', fontWeight: 'bold', marginTop: 10 }}>Quay lại đăng nhập</Text>
      </View>
    </ScrollView>
     
  );
}

export default Register;
