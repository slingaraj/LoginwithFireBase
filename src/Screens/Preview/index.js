import React from 'react'
import { View, Text, Image } from 'react-native'

const Preview = (props) => {
    return (
        
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View style={{
                justifyContent: 'center', alignItems: 'center',
                borderRadius: 10, borderWidth: 1, borderColor: 'lightpink', padding: 30
            }}>
                <Text>{props.route.params.title}</Text>

                <Image
                    style={{ width: 100, height: 100, resizeMode: 'stretch' }}
                    source={{ uri: props.route.params.image }}
                />

                <Text>{props.route.params.year}</Text>
            </View>



        </View>
    )
}

export default Preview
