import { useState } from "react"
import { useMyContextController } from "../store"
import firestore from "@react-native-firebase/firestore"
import { View,Alert, StyleSheet, Image} from "react-native"
import { HelperText, TextInput , Button } from "react-native-paper"
import { launchImageLibrary } from "react-native-image-picker"
import storage from "@react-native-firebase/storage"
import ImagePicker from 'react-native-image-crop-picker';
const AddNewService = ({navigation}) =>{
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const [serviceName, setServiceName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const hasErrorServiceName = () => serviceName ==""
    const hasErrorPrice = () => price <= 0
    const SERVICES = firestore().collection("SERVICES")
    const ref = storage().ref()
    const uploadImage = () =>{
        ImagePicker.openPicker({
            height: 300,
            width: 400,
            mediaType:"photo",
            cropping: true
        }).then(image => setImage(image.path))
          .catch( e => console.log(e.message))
    }
    const handleAddNewService = () =>{
        SERVICES.add(
            {
                serviceName,
                price,
                createBy: userLogin.email,
         
            }
        ).then(response => {
            const refImage = storage().ref("/services/" + response.id + ".png")
            if (image !== "") {          
                refImage.putFile(image).then(() => {
                    refImage.getDownloadURL().then(link => {
                        SERVICES.doc(response.id).update({
                            id: response.id,
                            image: link
                        }).then(() => {  
                            navigation.navigate("Services");
                        }).catch(e => {
                            console.log(e.message);
                            Alert.alert("An error occurs when updating data");
                        });
                    }).catch(e => {
                        console.log(e.message);
                        Alert.alert("An error occurs when getting image URL");
                    });
                }).catch(e => {
                    console.log(e.message);
                    Alert.alert("An error occurs when uploading an image");
                });
            } else {
                SERVICES.doc(response.id).update({
                    id: response.id
                }).then(() => {
                    navigation.navigate("Services");
                }).catch(e => {
                    console.log(e.message);
                    Alert.alert("An error occurs when updating data");
                });
            }
            // Alert.alert("Add new service success")
        })
        .catch(e=>Alert.alert("Add new service fail"))
    }
    return(
        <View style={{flex: 1, padding:10}}>
            <Button onPress={uploadImage}>
                Upload Image
            </Button>
            {((image!="") && (<Image source={{uri:image}} style={{height:300}}/>))}
            <TextInput 
            style={{marginTop: 50}}
            label={"Input Service Name"}
            value={serviceName}
            onChangeText={setServiceName}
            />
            <HelperText type="error" visible={hasErrorServiceName()}>Service Name not empty</HelperText>
            <TextInput 
            label={"Input price"}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"/>
            <HelperText type="error" visible={hasErrorPrice()}>{"Price > 0"}</HelperText>
        
            <Button mode="contained" style={Style.button} onPress={handleAddNewService}>Add New Service</Button>
        </View>
    )
}
var Style = StyleSheet.create({
    button:{
        marginTop:7,
        padding: 10,
        backgroundColor: '#f04663',
        borderRadius: 5
      
    },

})
export default AddNewService