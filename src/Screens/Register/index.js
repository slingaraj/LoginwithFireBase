import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput,Image, TouchableOpacity, Alert, ActivityIndicator,Platform} from 'react-native'
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [image, setImage] = useState(null);

    const selectImage = () => {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            const ImageUri = Platform.OS == "ios" ? image.sourceURL : image.path
            console.log(image.path);
            setImage(image.path)

        });
    };



    const register = async () => {
        if (email == "") {
            alert('Please Enter Your Email')
            return
        }
        if (password == "") {
            alert('Please Enter Your Password')
            return
        }
        let uploadURI = image
        let filename = uploadURI.substring(uploadURI.lastIndexOf('/') + 1);
        console.log(filename);

        try {
            await storage().ref(filename).putFile(uploadURI);
            alert('photo uploaded successfully')

        } catch (e) {
            console.log(e);
        }


        setShowLoading(true);
        try {
            const doRegister = await auth().createUserWithEmailAndPassword(email, password);
            alert('Successfully Registered')
            setShowLoading(false);
            if (doRegister.user) {
                props.navigation.navigate('Login')
            }
        } catch (e) {
            setShowLoading(false);
            Alert.alert(
                e.message
            );
        }

    };
    return (
        <SafeAreaView style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
        }}>

            <TouchableOpacity style={{
                borderRadius: 5,
                width: 150,
                height: 50,
                backgroundColor: '#8ac6d1',
                alignItems: 'center',
                justifyContent: 'center'
            }} onPress={selectImage}>
                <Text>Pick an image</Text>
            </TouchableOpacity>

            {image !== null ? (
                    <Image source={{ uri: image }} style={{height:100,width:100,borderRadius:20}} />
                ) : null}
            <TextInput
                style={{
                    backgroundColor: 'lightgray',
                    borderRadius: 5,
                    borderWidth: 1,
                    padding: 10,
                    width: '80%',
                    borderColor: 'lightblue'
                }}
                placeholder="Enter Your Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={{
                    backgroundColor: 'lightgray',
                    borderRadius: 5,
                    borderWidth: 1,
                    padding: 10,
                    width: '80%',
                    borderColor: 'lightblue',
                    marginTop: 10
                }}
                placeholder="Enter Your Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                onPress={() => register()}

                style={{
                    marginTop: 15,
                    backgroundColor: 'lightblue',
                    padding: 10,
                    borderRadius: 10,
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}

                style={{
                    marginTop: 30,
                }}>
                <Text style={{
                    color: 'red'
                }}>Already have an acoount?</Text>
            </TouchableOpacity>

            {showLoading &&
                <View style={
                    {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                }>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
        </SafeAreaView>
    )
}

export default Register
