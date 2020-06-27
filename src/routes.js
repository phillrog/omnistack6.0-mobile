import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { 
    View, 
    StyleSheet, 
    TouchableOpacity
 } from 'react-native';

 
const Stack = createStackNavigator();

import Main from './pages/Main';
import Box from './pages/Box';

function Routes() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'
          screenOptions={{
            gestureEnabled: false,
            title: "Omni Stack 6.0",
            headerLeft: null,
            headerTitleAlign: "center",          
          }}>
          <Stack.Screen 
            name='Main' 
            component={Main} 
            options={{
              headerStyle: ({ backgroundColor: "#efefef"}),
              headerTintColor: "#7159c1",
              
            }}
          />
        <Stack.Screen 
            name='Box' 
            component={Box}
            options={{
                headerStyle: ({ backgroundColor: "#fff"}),
                headerTintColor: "#008abe",                
              }}
            />
          
         </Stack.Navigator>
    </NavigationContainer>
  )
}

 export default Routes;