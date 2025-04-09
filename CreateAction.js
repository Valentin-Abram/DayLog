import React, { useEffect } from "react";
import { View, Text, StyleSheet,TouchableOpacity, TextInput } from "react-native";
import styles from "./styles";
import {initDatabase, addAction, RemoveActionTable} from "./database";


export default function CreateAction({navigation, route}){
    
    useEffect(()=> {
        // RemoveActionTable().then(message => {
        //     console.log(message)
        // });
        initDatabase().catch(err => console.error(err));
        

    },[]);


    const [actionTitle, onChangeActionTitle] = React.useState('');
    const [actionDescription, onChangeActionDescription] = React.useState('');
    
    return (
        <View style={styles.container}>
            <TextInput 
                onChangeText={onChangeActionTitle}
                value={actionTitle}
                style={[styles.textInpt, styles.singleLineInput]}
                placeholder="title"/>
            <TextInput
                onChangeText={onChangeActionDescription}
                value={actionDescription}
                style={[styles.textInpt,styles.multilineInput]}
                placeholder="description"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"/>
            <TouchableOpacity 
                    style={styles.btn}
                    onPress={async () => {
                        const action = await addAction(actionTitle,actionDescription, Date.now());
                        console.log(action);
                        navigation.navigate('ActionsList');
                    }
                }>
                <Text>Start</Text>
            </TouchableOpacity>
        </View>
    );
}