import { Settings, Text, View } from "react-native"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import MyStack from "../routers/MyStack"
import SettingsOption from "./SettingsOption"
import CustomerManager from "./CustomerManager"
import MyStack2 from "../routers/MyStack2"
import MyStack3 from "../routers/MyStack3"
import RouterCustomer from "../routers/RouterCustomer"
import Appointments from "../screens/Appointments"
import RouterCustomer2 from "../routers/RouterCustomer2"
const Tab = createMaterialBottomTabNavigator()
const Customer = () =>{
    return(
       <Tab.Navigator>
        <Tab.Screen name="RouterCustomer" component={RouterCustomer}
        options={{title:"Home",tabBarIcon:"home"}}/>
        <Tab.Screen name="Appointment" component={RouterCustomer2}
        options={{tabBarIcon:"cash"}}/>
        <Tab.Screen name="Setting" component={MyStack3}
        options={{tabBarIcon:"cog"}}/>
       </Tab.Navigator>
    )
}
export default Customer