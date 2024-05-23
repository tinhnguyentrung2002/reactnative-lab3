import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";
import ServicesCustomer from "../screens/ServicesCustomer";
import AddNewAppointment from "../screens/AddNewAppointment";
import { IconButton } from "react-native-paper";
const Stack = createStackNavigator()
const RouterCustomer = ({navigation}) =>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    return(
        <Stack.Navigator
        initialRouteName="Services"
        screenOptions={{
            title: (userLogin!=null) && (userLogin.name),
            headerTitleAlign:"center",
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:"#ea7389"
            },
            headerRight: (props) => <IconButton onPress={()=>navigation.navigate("Setting")}    icon={"account"} />
        }}>
            <Stack.Screen name="ServicesCustomer" component={ServicesCustomer} />
            <Stack.Screen name="AddNewAppointment" component={AddNewAppointment} />
        </Stack.Navigator>
    )
}

export default RouterCustomer