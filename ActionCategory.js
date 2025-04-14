import React, { useState, useEffect } from "react";
import * as db from './database'
import { View, Text, FlatList, TouchableWithoutFeedback, TextInput, Button, TouchableOpacity } from "react-native";
import styles from "./styles";




export default function ActionCategory() {

    const [actionCategories, setActionCategories] = useState([]);
    const [newCategoryTitle, setNewCategoryTitle] = useState('');

    useEffect(() => {
        db.getActionCategories()
            .then((res) => {
                console.log(JSON.stringify(res));
                setActionCategories(res);
            });
    }, []);

    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback>
                <Text>{item.title}</Text>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={actionCategories}
                renderItem={renderItem}
                ListEmptyComponent={<Text>No categories available</Text>} />

            <View style={{position: 'absolute', bottom: 20, width:'100%', alignItems:'center'}}>
                <TextInput
                    value={newCategoryTitle}
                    onChangeText={setNewCategoryTitle}
                    placeholder="type here to add new category"
                    style={[styles.singleLineInput, styles.textInpt, {borderWidth:0, borderBottomWidth:2}]}
                />
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={()=>{
                       // db.addActionCategory(newCategoryTitle)
                    }}
                    >
                    <Text>Add</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
}