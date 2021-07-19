import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth';
const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const register = async () => {
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
