import Login from "./screens/Login";
import { MyContextControllerProvider } from "./store";
import Router from "./routers/Router"
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";

const App = () =>{
  useEffect(()=>{
    const USERS = firestore().collection("USERS")
    const admin = {
      phone: "0911111111",
      password: "123456789",
      fullName: "Nguyễn Trung Tính",
      email: "2024802010018@student.tdmu.edu.vn",
      role: "admin",
      state:'Available'
    }
    USERS.doc(admin.email).onSnapshot(u => {
      // console.log(u.exists)
      // console.log(u.data())
      if(!u.exists)
      { 
        auth().createUserWithEmailAndPassword(admin.email, admin.password).then(response=>{
          USERS.doc(admin.email).set(admin).then(()=> console.log("Add new user admin!"))
        })
      }
    })
  },[])
  return(
    <View style={{flex:1}}>
      <StatusBar style="light" />
      <PaperProvider>
      <MyContextControllerProvider>
          <NavigationContainer>
            <Router/>
          </NavigationContainer>
        </MyContextControllerProvider>
      </PaperProvider>
    </View>
  
 
  )
}
export default App