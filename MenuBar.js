import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


/**
 * 
 * @param {ListItem[]} listItems  
 * @returns 
 */
export default function MenuBar({ listItems = [] }) {
    return (
        <View style={styles.bottomMenuContainer}>
            {listItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => {
                        item.onPress()
                        item.onClose();
                    }}
                    activeOpacity={0.7}
                >
                    <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}


export class ListItem{
    constructor(name, onPress,onClose){
        this.name = name;
        this.onPress = onPress;
        this.onClose = onClose;
    }
}


const styles = StyleSheet.create({
   
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    bottomMenuContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 15,
        elevation: 5, // Shadow on Android
        shadowColor: '#000', // Shadow on iOS
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      text: {
        fontSize: 16,
        color: '#333',
    },
});