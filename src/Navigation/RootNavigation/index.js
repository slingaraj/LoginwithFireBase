import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../../Screens/Register';
import Login from '../../Screens/Login';
import Preview from '../../Screens/Preview';
import Home from '../../Screens/Home';
import MobileAuth from '../../Screens/MobileAuth';
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{
              headerShown:false
          }}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Preview" component={Preview} />
        <Stack.Screen name="MobileAuth" component={MobileAuth} />
      </Stack.Navigator>
        </NavigationContainer>
    );
}