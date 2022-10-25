import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home/Home';
import ChangeCity from './screens/City/ChangeCity';

const Stack = createNativeStackNavigator();



const App = () => {
  return (
    <NavigationContainer  >
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChangeCity" component={ChangeCity} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;