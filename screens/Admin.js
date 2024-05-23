import { Settings, Text, View } from "react-native"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import MyStack from "../routers/MyStack"
import SettingsOption from "./SettingsOption"
import CustomerManager from "./CustomerManager"
import MyStack2 from "../routers/MyStack2"
import MyStack3 from "../routers/MyStack3"
import Transactions from "../screens/Transactions"
import MyStack1 from "../routers/MyStack1"
const Tab = createMaterialBottomTabNavigator()
const Admin = () =>{
    return(
       <Tab.Navigator>
        <Tab.Screen name="MyStack" component={MyStack}
        options={{title:"Home",tabBarIcon:"home"}}/>
        <Tab.Screen name="Transaction" component={MyStack1}
        options={{tabBarIcon:"cash"}}/>
        <Tab.Screen name="Customers" component={MyStack2}
        options={{tabBarIcon:"account"}}/>
        <Tab.Screen name="Setting" component={MyStack3}
        options={{tabBarIcon:"cog"}}/>
       </Tab.Navigator>
    )
}
export default Admin