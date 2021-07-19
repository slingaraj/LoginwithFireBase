import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const login = async () => {

        if (email == "") {
            alert('Please Enter Your Email')
            return
        }
        if (password == "") {
            alert('Please Enter Your Password')
            return
        }
        setShowLoading(true);
        try {
            const doLogin = await auth().signInWithEmailAndPassword(email, password);
            alert('Welcome')
            setShowLoading(false);
            if (doLogin.user) {
                props.navigation.navigate('Home')
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
                alue={email}
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
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => login()}>
                {showLoading ?
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                    :
                    <Text

                        style={
                            {
                                marginTop: 15,
                                backgroundColor: 'lightpink',
                                padding: 10,
                                borderRadius: 10,
                                padding: 10

                            }
                        }>Login</Text>
                }
               

            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>props.navigation.navigate('Register')}
                style={{
                    marginTop: 30,
                }}>
                <Text style={{
                    color: 'red'
                }}>Don't Have an Account ? Login Here</Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default Login
