import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { firebase } from '@react-native-firebase/auth';

const MobileAuth = (props) => {
    const [phone, setPhone] = useState('');

    async function confirmCode() {

        if(phone == ""){
            alert('please Enter Your Mobile Number')
            return
        }
        firebase.auth().signInWithPhoneNumber(phone)
            .then(confirmResult =>{console.log(confirmResult)
                    props.navigation.navigate('Home')
                    alert('Login Successfully')
                })

            .catch(error =>
                {
                     props.navigation.navigate('home')
                console.log(error)
                }
            );
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <TextInput
                style={{
                    backgroundColor: 'lightgray',
                    borderRadius: 5,
                    borderWidth: 1,
                    padding: 10,
                    width: '80%',
                    borderColor: 'lightblue',marginBottom:5
                }}
                placeholder="+918249167261"
                value={phone}
                onChangeText={setPhone}
            />

            <Button title="Confirm Code" onPress={() => confirmCode()} />

            <Text style={{marginTop:10}}>For testing i have added +918249167261 For testing</Text>
        </View>
    )
}

export default MobileAuth
