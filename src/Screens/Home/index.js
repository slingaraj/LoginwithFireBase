// import React, { Component } from 'react'
// import { Text, StyleSheet, View, FlatList, Image, Button, TouchableOpacity } from 'react-native'
// import axios from 'axios';

// export default class HomeScreen extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             dataFromApi: []
//         }
//     }
//     componentDidMount() {
//         this.catchDataFromApi()
//     }
//     catchDataFromApi() {

//         axios.get('https://api.androidhive.info/json/movies.json')
//             .then((response) => {
//                 this.setState({ dataFromApi: response.data })
//             })

//     }


//     renderItem = ({ item }) => (
//         <TouchableOpacity
//             onPress={() => {
//                 this.props.navigation.navigate('Preview', {
//                     title: item.title,
//                     image: item.image,
//                     year: item.releaseYear


//                 });
//             }}
//             style={{
//                 margin: 20, justifyContent: 'center', alignItems: 'center',
//                 borderWidth: 1, borderColor: 'lightgray', borderRadius: 10
//             }}>
//             <Text>{item.title}</Text>
//             <Image
//                 style={{ width: 100, height: 100, resizeMode: 'stretch' }}
//                 source={{ uri: item.image }}
//             />
//             <Text>{item.rating}</Text>
//             <Text>{item.releaseYear}</Text>

//         </TouchableOpacity>


//     );
//     render() {

//         return (
//             <View>
//                 <TouchableOpacity
//                     onPress={() => this.props.navigation.navigate('Login')}
//                     style={{ height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightpink', marginTop: 15, marginHorizontal: '10%' }}>
//                     <Text>logout</Text>
//                 </TouchableOpacity>


//                 <FlatList
//                     data={this.state.dataFromApi}
//                     renderItem={this.renderItem}
//                     keyExtractor={item => item.title}
//                 />
//             </View>
//         )
//     }
// }

import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';


const Home = () => {
    const [hotelName, setHotelName] = useState('')
    const [description, setDescription] = useState('')

    //for showing data
    const [hotelNameShow, setHotelNameShow] = useState('')
    const [descriptionShow, setDescriptionShow] = useState('')


    const upload = async () => {

        if (hotelName == "") {
            alert("enter Hotel Name")
        }
        if (description == "") {
            alert('enter Hotel Desc')
        }
        firestore().collection('post').add({
            hotelNameServer: hotelName,
            desc: description
        }).then((val) => {
            console.log(val);
            alert("hotel Added Successfully")
        }).catch((e) => {
            console.log(e);
        })
    }

    const getData = async () => {
        let data = await firestore().collection('post').get();
        //  console.log(data);
        let datanew = data.forEach(item => {
            //  console.log(item);
            console.log(item._data.hotelNameServer);
            setHotelNameShow(item._data.hotelNameServer)
            setDescriptionShow(item._data.desc)
        })
    }


    return (
        <View style={{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center'
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
                placeholder="Enter Hotel Name"
                value={hotelName}
                onChangeText={setHotelName}
            />
            <TextInput
                style={{
                    backgroundColor: 'lightgray',
                    borderRadius: 5,
                    borderWidth: 1,
                    padding: 10,
                    width: '80%',
                    borderColor: 'lightblue'
                }}
                placeholder="Enter Hotel Description"
                value={description}
                onChangeText={setDescription}
            />

            <TouchableOpacity
                onPress={() => upload()}

                style={{
                    marginTop: 15,
                    backgroundColor: 'lightblue',
                    padding: 10,
                    borderRadius: 10,
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text>Upload data</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => getData()}

                style={{
                    marginTop: 15,
                    backgroundColor: 'lightblue',
                    padding: 10,
                    borderRadius: 10,
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Text>Get  Hotel</Text>
            </TouchableOpacity>

            <Text>{hotelNameShow}</Text>
            <Text>{descriptionShow}</Text>


        </View>
    )
}

export default Home
