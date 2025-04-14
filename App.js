import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './HomeScreen';
import CreateAction from './CreateAction';
import DetailsAction from './DetailsAction';
import ActionsList from './ActionsList';
import { navigationRef } from './RootNavigation';
import Header from './Header';
import Footer from './Footer';
import ActionCategory from './ActionCategory';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeigh : 0 }} ref={navigationRef}>
      <Stack.Navigator initialRouteName='HomeScreen' headerMode='screen'>
        <Stack.Screen 
          name='HomeScreen'
          component={HomeScreen}
          options={{
          header: () => <Header headerDisplay='' />
        }} />
        <Stack.Screen
         name='CreateAction'
          component={CreateAction}
          options={{
            header: () => <Header headerDisplay='' />
          }} 
           />
        <Stack.Screen 
        name='DetailsAction'
         component={DetailsAction}
         options={{
          header: () => <Header headerDisplay='' />
        }}
         />
        <Stack.Screen 
        name='ActionsList'
         component={ActionsList}
         options={{
          header: () => <Header headerDisplay='' />
        }}
         />
         <Stack.Screen
          name='ActionCategory'
          component={ActionCategory}
          options={{
            header: () => <Header headerDisplay=''/>
          }}
          />
      </Stack.Navigator>
      <Footer/>
    </NavigationContainer>
  );
}
