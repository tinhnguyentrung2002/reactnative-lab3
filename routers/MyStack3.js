import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";
import Services from "../screens/Services";
import AddNewService from "../screens/AddNewService";
import ServiceDetail from "../screens/ServiceDetail";
import CustomerManager from "../screens/CustomerManager";
import UpdateCustomer from "../screens/UpdateCustomer";
import SettingsOption from "../screens/SettingsOption";
import ChangePassword from "../screens/ChangePassword";

const Stack = createStackNavigator()
const MyStack3 = ({navigation}) =>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    return(
        <Stack.Navigator
        initialRouteName="SettingOptions"
        screenOptions={{
            title: (userLogin!=null) && (userLogin.name),
            headerTitleAlign:"center",
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:"#ea7389"
            },
        }}>
            <Stack.Screen name="SettingsOption" component={SettingsOption} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
    )
}
export default MyStack3