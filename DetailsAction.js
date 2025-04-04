import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image, TextInput,Button } from "react-native";
import styles from "./styles";
import { Time } from "./Time";
import { updateAction } from "./database";
import DatePicker from "react-native-date-picker";

export default function DetailsAction({ navigation, route }) {
    const { id } = route.params.action;

    const [editState, setEditState] = useState(false);
    const [{ createdAt }, setCreatedAt] = useState(route.params.action);
    const [{ description }, setDescription] = useState(route.params.action);
    const [{ finishedAt }, setFinishedAt] = useState(route.params.action);
    const [{ title }, setTitle] = useState(route.params.action);
    const [timeSpent, setTimeSpent] = useState(calcTimeSpent());

   

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [activeDateType, setActiveDateType] = useState('');

    useEffect(() => {
        setTimeSpent(calcTimeSpent());
        // Start the timer only if finishedAt is not set
        if (!finishedAt) {
            const interval = setInterval(() => {
                setTimeSpent(calcTimeSpent());
            }, 1000);

            // Clean up when the component unmounts or finishedAt is set
            return () => clearInterval(interval);
        }
    }, [createdAt,finishedAt]); // Only restart effect when finishedAtState changes

    function calcTimeSpent() {
        return (finishedAt ? finishedAt : Date.now()) - createdAt;
    }

    function editCancel(){
        setTitle(route.params.action.title);
        setDescription(route.params.action.description);
        setCreatedAt(route.params.action.createdAt);
        if(finishedAt)
            setFinishedAt(route.params.action.finishedAt);
    }

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        return `${hrs.toString().padStart(2, '0')}:` +
            `${mins.toString().padStart(2, '0')}:` +
            `${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View style={[styles.container, { justifyContent: "flex-start" }]}>
            <View style={DetailsActionStyles.header}>

                <TextInput
                    style={editState ? styles.textInpt : styles.title}
                    value={title}
                    onChangeText={
                        (text) => {
                            setTitle(prev => ({
                              ...prev, title: text  
                            }))
                        }
                    }
                    readOnly={!editState}
                />

                {!editState && (<TouchableOpacity onPress={() => setEditState(true)} >
                    <Image source={require('./assets/edit-icon.png')} style={styles.icon} />
                </TouchableOpacity>)}

            </View>

            <View style={styles.datesContainer}>
                {!editState && (
                    <>
                        <Text style={styles.dateText}>Created at : {new Date(createdAt).toLocaleString()}</Text>

                        {finishedAt && (
                            <Text style={styles.dateText}>Finished at : {new Date(finishedAt).toLocaleString()}</Text>
                        )}

                        <Text>Time spent {formatTime(timeSpent / 1000)}</Text>
                    </>
                )}


                {editState && (
                    <>
                        <Button title={new Date(createdAt).toLocaleString()} onPress={() => {
                            setActiveDateType('createdAt');
                            setDate(new Date(createdAt));
                            setOpen(true);
                            }} />
                        
                        {finishedAt && (
                            <Button title={new Date(finishedAt).toLocaleString()} onPress={() => {
                                setActiveDateType('finishedAt');
                                setDate(new Date(finishedAt));
                                setOpen(true);
                            }} />
                        )}
                        <DatePicker
                            modal={true}
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setDate(date);
                                if(activeDateType == 'createdAt'){
                                    setCreatedAt(prev => ({
                                        ...prev,            // Spread the previous object to keep other properties
                                        createdAt: date.getTime() 
                                    }));
                                }else if(activeDateType == 'finishedAt'){
                                    setFinishedAt(prev => ({
                                        ...prev,            // Spread the previous object to keep other properties
                                        finishedAt: date.getTime()  
                                    }))
                                }
                                
                                setOpen(false)
                            }}
                            onCancel={() => 
                                setOpen(false)
                            }
                        />
                    </>
                )}


            </View>
            <TextInput
                value={description}
                onChangeText={
                    (text) => {
                        setDescription(prev => ({
                          ...prev, description: text  
                        }))
                    }
                }
                multiline={true}
                style={(editState ? [styles.textInpt, styles.multilineInput] : styles.description)}
                numberOfLines={4}
                textAlignVertical="top"
                readOnly={!editState}
            />


            {editState && (
                <>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        updateAction(id, title, description, createdAt, finishedAt)
                        setEditState(false);
                    }}>
                    <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    editCancel();
                    setEditState(false);
                }}>
                <Text>Cancel</Text>
            </TouchableOpacity>
            </>
            )}


            {!finishedAt && !editState && (<TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    updateAction(id, title, description, createdAt, Date.now())
                        .then(res => {
                            setFinishedAt(res.finishedAt);
                            navigation.navigate('ActionsList');
                        });
                }}>
                <Text>Finish action</Text>
            </TouchableOpacity>)}


                
        </View>
    );
}

const DetailsActionStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
    },
    flexItem: {
        flex: 1,
    }
});
