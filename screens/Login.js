import { useEffect, useState } from "react"
import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity } from "react-native"
import { Checkbox, HelperText} from "react-native-paper"
import { useNavigation, useRoute } from '@react-navigation/native';
import {  login, useMyContextController } from '../store/index'; 
const Login = ({ navigation}) => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [controller, dispatch] = useMyContextController();
    const {userLogin} = controller
    console.log(userLogin)
    useEffect(()=>{
        if(userLogin != null)
            {
                console.log(userLogin)
                if(userLogin.role == "admin" && userLogin.state =="Available") navigation.navigate("Admin")
                else if(userLogin.role =="customer" && userLogin.state =="Available") navigation.navigate("Customer")
            }
    },[userLogin])

    const onPress = () => {
     
        if (!username || !password) {
          setError('Vui lòng nhập đầy đủ thông tin');
          return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(username)) {
          setError('Email không hợp lệ');
          return;
        }
        setError('');
        login(dispatch, username, password);
    }
    return (
      <View style={LoginStyle.container}>
        <Text style={{textAlign:'center', fontSize:50,color:'#E92c4c', fontWeight:'bold', marginBottom:10}}>ĐĂNG NHẬP</Text>
        
        <TextInput
          onChangeText={setUserName}
          onEndEditing={username.length != 0?()=> setError(''):()=>setError('Vui lòng nhập đầy đủ thông tin')}
          style={LoginStyle.textInput}
          placeholder="Nhập tài khoản"
          value={username}
        />
        <TextInput
          onChangeText={setPassword}
          style={LoginStyle.textInput}
          onEndEditing={password.length != 0?()=> setError(''):()=>setError('Vui lòng nhập đầy đủ thông tin')}
          secureTextEntry={!showPassword}
          placeholder="Nhập mật khẩu"
          value={password}
        />
         <Text
          onPress={() => {
            navigation.navigate('ForgotPassword')
          }}
          style={{ alignSelf: "flex-end", marginRight: 18, marginTop:8,  fontStyle: "italic" }}>Quên mật khẩu</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', marginTop: 8, marginLeft: 8 }}>
          <Checkbox
            onPress={() => setShowPassword(!showPassword)}
            status={showPassword ? "checked" : "unchecked"}
            style={{ marginRight: 10, }}
          />
          <Text onPress={() => setShowPassword(!showPassword)}>Hiển thị mật khẩu</Text>
        </View>
  
        <HelperText type="error" visible={!!error}>{error}</HelperText>
        <TouchableOpacity
          onPress={onPress}
          style={LoginStyle.button}>
          <Text style={LoginStyle.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row', marginTop:10 }}>
        <Text style={{fontStyle:'italic'}} >Chưa có tài khoản ? </Text>
        <Text
          onPress={() => {
            navigation.navigate('Register')
          }}
          style={{ alignSelf: "flex-end", marginRight: 18, color:'#E92c4c', fontWeight:'bold', fontStyle:'italic'}}>Đăng ký ngay</Text>
        </View>
       
      </View>
    );
  };
export default Login
var LoginStyle = StyleSheet.create({
     container:{
         backgroundColor: 'white' ,
         flex:1,
         justifyContent:'center',
         padding:15,
         alignItems: "center"
     },
     textInput:{
         width:350,
         height:60,
         padding:10,
         marginTop:8,
         borderColor:"#e92c4c",
         borderWidth:0,
         borderRadius:8,
         backgroundColor:"whitesmoke"
     },
     button:{
         width: 350,
         marginTop:7,
         padding: 10,
         backgroundColor: '#f04663',
         borderRadius: 5
       
     },
     buttonText:{
         textAlign: "center",
         fontSize:18,
         fontWeight:"bold",
         color:"white"
     }
 })