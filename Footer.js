import React from "react";
import { StyleSheet, Text,View,TouchableOpacity, Image } from "react-native";
import * as RootNavigation from './RootNavigation';


export default function Footer(){
    return (
        <View style={styles.footer}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={()=> RootNavigation.navigate('HomeScreen')}>
                <Image 
                    source={require('./assets/home-icon.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
            onPress={() => RootNavigation.navigate('CreateAction')}>
                
                <Image 
                    source={require('./assets/add-icon.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
            onPress={() => RootNavigation.navigate('ActionsList')}>
                
                <Image 
                    source={require('./assets/list-icon.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
         
        </View>
    );
};


const styles = StyleSheet.create({
    footer:{
        width: '100%',
        height:80,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    button:{
        padding:20
    },
    icon:{
        width:40,
        height:40
    }
});