import { useLayoutEffect, useState, useEffect } from "react"
import { useMyContextController } from "../store"
import firestore from "@react-native-firebase/firestore"
import { View,Alert, StyleSheet, Image} from "react-native"
import { HelperText, TextInput , Button, IconButton, Portal, Dialog, Text } from "react-native-paper"
import { launchImageLibrary } from "react-native-image-picker"
import storage from "@react-native-firebase/storage"
import ImagePicker from 'react-native-image-crop-picker';
const ServiceDetail = ({navigation, route}) => {
    const {id} = route.params.item
    const [controller, dispatch] = useMyContextController()
    const {userLogin} = controller
    const [service, setService] = useState({})
    const [users, setUSERS] = useState({})
    const [visible, setVisible] = useState(false)
    const [author,setAuthor] = useState("")
    const hideDialog = () => setVisible(false)
    const hasErrorServiceName = () => service.serviceName == ""
    const hasErrorPrice = () => service.price <=0 
    const SERVICES = firestore().collection("SERVICES")
    const USERS = firestore().collection("USERS")
   

    const [isUploadImage, setIsUploadImage] = useState(false)
    useEffect(()=>{
        SERVICES.doc(id).onSnapshot(response => {
            const serviceData = response.data();
            setService(serviceData);
    
            if (serviceData) {
                const userID = serviceData.createBy;
                USERS.doc(userID).onSnapshot(userResponse => {
                    setUSERS(userResponse.data());
                    // console.log(userResponse.data().fullName);
                });
            }
        });
    },[id])
   
   
    const uploadImage = () =>{
        ImagePicker.openPicker({
            height: 300,
            width: 400,
            mediaType:"photo",
            cropping: true
        }).then(response => {setService({...service, image: response.path}), setIsUploadImage(true)})
          .catch( e => console.log(e.message))
    }
    const handleDeleteService = () =>{
        SERVICES.doc(id).delete().then(()=>navigation.navigate("Services"))
    }
    const handleUpdateService = () =>{
        //console.log(service.image)
        if(isUploadImage)
        {
            const refImage = storage().ref("/services/" + id + ".png")
            refImage.putFile(service.image).then(() =>{
                refImage.getDownloadURL().then(link =>{
                    SERVICES.doc(id).update({...service, create: userLogin.email, image: link})
                })
              
                navigation.navigate("Services")
            }).catch(e=>console.log(e.message))
        }
        else{
            SERVICES.doc(id).update({...service, create: userLogin.email})
            Alert.alert('Thông báo', 'Cập nhật dịch vụ thành công')
            navigation.navigate("Services")
        }
       
    }
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: (props) => <IconButton icon={"delete"} {...props} onPress={() => setVisible(true)} />
        })
    
    },[])
    return(
        (service != null ) && 
        <View style={{flex: 1, padding:10}}>
            <Button onPress={uploadImage}>
                Upload Image
            </Button>
            {((service.image && <Image source={{uri: service.image}} style={{height:300}}/>))}
            <Text style={{ alignSelf:'flex-end'}}>Create by: {users.fullName}</Text>
            <TextInput 
            style={{marginTop: 50}}
            label={"Input Service Name"}
            value={service.serviceName}
            onChangeText={(text) => setService({...service, serviceName: text})}
            />
            <HelperText type="error" visible={hasErrorServiceName()}>Service Name not empty</HelperText>
            <TextInput 
            label={"Input price"}
            value={service.price}
            onChangeText={(text) => setService({...service, price: text})}
            keyboardType="numeric"/>
            <HelperText type="error" visible={hasErrorPrice()}>{"Price > 0"}</HelperText>
        
            <Button mode="contained" style={Style.button} disabled={hasErrorServiceName() && hasErrorPrice()} onPress={handleUpdateService}>Update Service</Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Confirm Delete Service</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Do you want to delete service ?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>No</Button>
                        <Button onPress={handleDeleteService}>Yes</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
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
export default ServiceDetail