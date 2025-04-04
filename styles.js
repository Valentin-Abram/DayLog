import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    textInpt: {
        backgroundColor: '#FFFFFF', // White background
        borderColor: '#000000',     // Black border
        borderWidth: 2,             // Border thickness
        borderRadius: 5,           // Rounded corners (adjust for more/less curve)
        paddingHorizontal: 5,      // Horizontal padding
        width: '80%',
        margin: 10,
        fontSize: 20
    },
    singleLineInput: {
        height: 40
    },
    multilineInput: {
        height: 100
    },
    btn: {
        backgroundColor: '#FFFFFF', // White background
        borderColor: '#000000',     // Black border
        borderWidth: 2,             // Border thickness
        borderRadius: 5,           // Rounded corners (adjust for more/less curve)
        paddingVertical: 10,        // Vertical padding
        paddingHorizontal: 20,      // Horizontal padding
        alignItems: 'center',       // Center text
        width: '80%',
        margin: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    description: {
        color: '#666',
        marginTop: 4,
    },
    dateText: {
        color: '#888',
        fontSize: 12,
    },
    datesContainer: {
        //marginLeft: 8,
        //alignItems: 'flex-start', // Align to the start
        //maxWidth:'40%'
    },
    icon: {
        width: 40,
        height: 40,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent effect
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionItem: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row', // Change to column for vertical stacking
        justifyContent: 'flex-start',
        alignItems: 'flex-start',  // Stretch children across the available width
    },
    actionDetails: {
        flexShrink: 1,
        marginRight: 10, // Space between details and dates
        maxWidth: '80%'
    },
    collapsedDescription: {
        maxHeight: 60, // Limit height when collapsed
        overflow: 'hidden', // Hide excess text
    },
    toggleText: {
        color: '#007BFF',
        marginTop: 4,
        fontWeight: 'bold'
    },
});

export default styles;
