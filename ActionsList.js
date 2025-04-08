import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text, ActivityIndicator, TouchableOpacity, Button, Alert, TouchableWithoutFeedback, Image } from "react-native";
import * as db from './database';
import DatePicker from "react-native-date-picker";
import OptionButton from "./OptionButton";
import MenuBar, { ListItem } from "./MenuBar";
import styles from "./styles";


export default function ActionsList({ navigation }) {
    const [actions, onActionsChange] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);


    useEffect(() => {
        loadActions();
    }, [date])

    const loadActions = () => {
        setLoading(true);
        db.getActions(date)
            .then(result => {
                onActionsChange(result);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };


    // Render each action
    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback
                onPress={() =>
                    db.getAction(item.id)
                        .then(res => {
                            navigation.navigate('DetailsAction', { action: res });
                        })

                }
            >
                <View style={styles.actionItem}>
                    <View style={styles.actionDetails}>
                        <Text style={styles.title}>{item.title}</Text>

                        {/* Dynamic Description Styling */}
                        <Text
                            style={[
                                styles.description,
                                !expanded && styles.collapsedDescription
                            ]}
                        >
                            {item.description}
                        </Text>

                        {item.description.length > 100 && (
                            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                                <Text style={styles.toggleText}>
                                    {expanded ? 'Show Less' : 'Show More'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.datesContainer}>
                        <Text style={styles.dateText}>Created: {new Date(item.createdAt).toLocaleString()}</Text>
                        {item.finishedAt && (
                            <Text style={styles.dateText}>Finished: {new Date(item.finishedAt).toLocaleString()}</Text>
                        )}
                    </View>

                    <OptionButton onPress={
                        () => {
                            setSelectedItem(item);
                            setIsMenuVisible(true);
                        }
                    } />


                </View>
            </TouchableWithoutFeedback>

        );
    };


    return (
        <View style={styles.container}>
            <View >
                <TouchableOpacity
                    style={{ padding: 10, alignItems: 'flex-end' }}
                    onPress={() => setOpen(true)}>
                    <Image
                        source={require('./assets/calendar-icon.png')}
                        style={{ width: 40, height: 40 }} />
                </TouchableOpacity>

                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            </View>

            <View >
                {actions.length === 0 ? (
                    <Text style={styles.emptyText}>No actions found.</Text>
                ) : (
                    <FlatList
                        data={actions}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                        ListEmptyComponent={<Text style={styles.emptyText}>No actions available</Text>}
                        removeClippedSubviews={false}
                    />
                )}


            </View>
            {/* Render MenuBar outside the list at the bottom */}
            {isMenuVisible && (
                <>
                    <TouchableWithoutFeedback onPress={() => setIsMenuVisible(false)}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>
                    <MenuBar
                        listItems={[
                            new ListItem(
                                'Create new from',
                                () => {
                                    db.addAction(selectedItem.title, selectedItem.description, Date.now())
                                    .then(res => loadActions() );
                                    
                                },
                                () =>{ 
                                    setIsMenuVisible(false);
                                }
                            ),
                            new ListItem(
                                'Delete',
                                () => {
                                    db.deleteAction(selectedItem.id)
                                    .then(res => loadActions() );
                                },
                                () =>{ 
                                    setIsMenuVisible(false);
                                }
                            ),
                        ]}
                    />
                </>
            )}
        </View>
    );
}

