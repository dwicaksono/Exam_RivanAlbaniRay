import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Screen1, Screen2} from '../pages';
import Splash from '../pages/splash';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Screen2"
        component={Screen2}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
