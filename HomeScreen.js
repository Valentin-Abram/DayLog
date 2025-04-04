import React, { useState } from "react";
import { TouchableOpacity, TouchableWithoutFeedback, View, Text, StyleSheet, Keyboard } from "react-native";
import styles from "./styles";
import MenuBar from "./MenuBar";

export default function HomeScreen({ navigation }) {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    return (
       
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('CreateAction')}>
                <Text>Start action</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ActionsList')}>
                <Text>Actions list</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.btn}
                onPress={() => setIsMenuVisible(!isMenuVisible)}
            >
                <Text>Show Menu</Text>
            </TouchableOpacity>

            {isMenuVisible && (
                 <>
                 {/* Background overlay with touch detection to close menu */}
                 <TouchableWithoutFeedback onPress={() => setIsMenuVisible(false)}>
                     <View style={styles.overlay} />
                 </TouchableWithoutFeedback>

                 {/* MenuBar positioned at the bottom */}
                 <MenuBar
                     listItems={["Item 1", "Item 2", "Item 3"]}
                     onClose={() => setIsMenuVisible(false)}
                 />
                </>
            )}


        </View>
        
    );
}

