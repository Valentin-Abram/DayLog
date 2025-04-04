import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import logo from './assets/icon.png';

export default function Header(props){
    return (
        <View style = {styles.header}>
           
            <View>
                <Text>{props.headerDisplay}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:0,
        alignItems:'center',
        justifyContent:'center'
    },
    
});