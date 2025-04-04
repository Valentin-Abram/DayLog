import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function MenuBar({ listItems = [] , onClose =() =>{}}) {
    return (
        <View style={styles.bottomMenuContainer}>
            {listItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => {
                        console.log(`Pressed: ${item}`);
                        onClose();
                    }}
                    activeOpacity={0.7}
                >
                    <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
   
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    bottomMenuContainer: {
        width: '95%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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