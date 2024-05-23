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

const Stack = createStackNavigator()
const MyStack2 = () =>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    return(
        <Stack.Navigator
        initialRouteName="CustomersManager"
        screenOptions={{
            title: (userLogin!=null) && (userLogin.name),
            headerTitleAlign:"center",
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:"#ea7389"
            },
            headerRight: (props) => <IconButton onPress={()=>navigation.navigate("Setting")}   icon={"account"} />
        }}>
            <Stack.Screen name="CustomersManager" component={CustomerManager} />
            <Stack.Screen name="UpdateCustomer" component={UpdateCustomer}/>
        </Stack.Navigator>
    )
}
export default MyStack2