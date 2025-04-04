import React, {useState} from "react";
import { Image, TouchableOpacity,TouchableWithoutFeedback,View } from "react-native";
import styles from "./styles";
import MenuBar from "./MenuBar";


export default function OptionButton({ onPress = () => { } }) {
    return (
            <TouchableOpacity onPress={onPress}>
                <Image style={styles.icon} source={require('./assets/three-dots-icon.png')} />
            </TouchableOpacity>
    );
}