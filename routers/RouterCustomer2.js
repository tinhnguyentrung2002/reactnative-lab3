import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";
import UpdateCustomer from "../screens/UpdateCustomer";
import Appointments from "../screens/Appointments";
import AppointmentDetail from "../screens/AppointmentDetail";

const Stack = createStackNavigator()
const RouterCustomer2 = ({navigation}) =>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    return(
        <Stack.Navigator
        initialRouteName="Appoinments"
        screenOptions={{
            title: (userLogin!=null) && (userLogin.name),
            headerTitleAlign:"center",
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:"#ea7389"
            },
            headerRight: (props) => <IconButton onPress={()=>navigation.navigate("Setting")}   icon={"account"} />
        }}>
            <Stack.Screen name="Appointments" component={Appointments} />
            <Stack.Screen name="AppointmentDetail" component={AppointmentDetail}/>
        </Stack.Navigator>
    )
}
export default RouterCustomer2