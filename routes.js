import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native'
import Home from './routes/home.js'
import Blog from './routes/blog.js'
import Post from './routes/post.js'

const Tab = createBottomTabNavigator();

export default class Routes extends React.Component {
   render() {
      return (
         <NavigationContainer>
            <Tab.Navigator>
               <Tab.Screen name="home" component={Home} initial={true}/>
               <Tab.Screen name="blog" component={Blog} />
               <Tab.Screen name="post" component={Post} />
            </Tab.Navigator>
         </NavigationContainer>
      )
   }
}
const styles = StyleSheet.create({
   mainview: {
      height: '80vh'
   },
   scene: {
      backgroundColor: '#F5FCFF',
      shadowOpacity: 1,
      shadowRadius: 3,
    },
})