import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";
import Services from "../screens/Services";
import AddNewService from "../screens/AddNewService";
import ServiceDetail from "../screens/ServiceDetail";
import CustomerManager from "../screens/CustomerManager";

const Stack = createStackNavigator()
const MyStack = ({navigation}) =>{
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
            headerRight: (props) => <IconButton onPress={()=>navigation.navigate("Setting")} icon={"account"} />
        }}>
            <Stack.Screen name="Services" component={Services} />
            <Stack.Screen name="AddNewService" component={AddNewService}/>
            <Stack.Screen name="ServiceDetail" component={ServiceDetail}/>
        </Stack.Navigator>
    )
}
export default MyStack