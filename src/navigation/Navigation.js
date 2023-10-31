import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home';
import Movie from '../screen/Movie';
import Person from '../screen/Person';
import Search from '../screen/Search';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="Movie" component={Movie} options={{headerShown:false}} />
        <Stack.Screen name="Person" component={Person} options={{headerShown:false}} />
        <Stack.Screen name="Search" component={Search} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation