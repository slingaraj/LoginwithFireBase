import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Image, Button, TouchableOpacity } from 'react-native'
import axios from 'axios';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromApi: []
        }
    }
    componentDidMount() {
        this.catchDataFromApi()
    }
    catchDataFromApi() {

        axios.get('https://api.androidhive.info/json/movies.json')
            .then((response) => {
                this.setState({ dataFromApi: response.data })
            })

    }


    renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                this.props.navigation.navigate('Preview', {
                    title: item.title,
                    image: item.image,
                    year: item.releaseYear


                });
            }}
            style={{
                margin: 20, justifyContent: 'center', alignItems: 'center',
                borderWidth: 1, borderColor: 'lightgray', borderRadius: 10
            }}>
            <Text>{item.title}</Text>
            <Image
                style={{ width: 100, height: 100, resizeMode: 'stretch' }}
                source={{ uri: item.image }}
            />
            <Text>{item.rating}</Text>
            <Text>{item.releaseYear}</Text>

        </TouchableOpacity>


    );
    render() {

        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}
                    style={{ height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightpink', marginTop: 15, marginHorizontal: '10%' }}>
                    <Text>logout</Text>
                </TouchableOpacity>


                <FlatList
                    data={this.state.dataFromApi}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.title}
                />
            </View>
        )
    }
}

