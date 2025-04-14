import React, { useEffect, useState } from "react";
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
    const [actionCategory, setActionCategory] = useState(route.params?.category);
    
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
         <View style={{width: '80%'}}>
            <TouchableOpacity 
                style={{padding: 10, borderBottomWidth:1, borderBlockColor: 'black', width: '100%' }}
                onPress={() => navigation.navigate('ActionCategory')}
                >
                <Text>{actionCategory ? actionCategory.title : 'categorize'}</Text>
            </TouchableOpacity>
         </View>
         
            <TouchableOpacity 
                    style={[styles.btn, {position: 'absolute', bottom: 20}]}
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