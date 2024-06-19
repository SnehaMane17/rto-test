import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import logoH from '../../assets/logoH.jpeg'

const { width } = Dimensions.get('window');

const WelcomeScreen = () => (
    <View style={styles.container}>
        <View style={styles.contentContainer}>
            <Text style={styles.title}>Mukesh M. Bhandari</Text>
            <Text style={styles.subtitle}>Mob.: 70144 44208</Text>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>M. G Motors</Text>
               
            </View>
            <View >
                
                <Image 
                    source={logoH} // Use the imported image
                    style={styles.logoImage}
                />
            </View>
            <Text style={styles.description}>MG motor driving & Training school</Text>
            <Text style={styles.approval}>(Govt. Approved.)</Text>
            <View style={styles.advisorContainer}>
                <Text style={styles.advisor}>R.T.O. AUTO ADVISOR</Text>
            </View>
            <Text style={styles.address}>Plot no 54, Balaji Vihar, near Ramlyawala dairy yojana, Sikar road, Jaipur, Rajasthan India</Text>
            <Text style={styles.email}>E-mail: mgautojpr@gmail.com</Text>
        </View>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start app</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'space-between', // Distributes space between and around the content
    },
    contentContainer: {
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 80
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0000FF',
        marginBottom: 5,
       
    },
    subtitle: {
        fontSize: 18,
        color: '#0000FF',
        marginBottom: 20,
         marginTop: 5
    },
    logoContainer: {
        backgroundColor: '#0000FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30, // half of the width to make it an oval
        marginBottom: 25,
        marginTop: 15,
        width: 200,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
    },
     logoImage: {
        width: 50, // Adjust the width and height based on your image size
        height: 50,
        resizeMode: 'contain',
        marginBottom: 20
    },
    description: {
        fontSize: 18,
        color: '#0000FF',
        textAlign: 'center',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    approval: {
        fontSize: 16,
        color: '#0000FF',
        marginBottom: 20,
    },
    advisorContainer: {
        backgroundColor: '#FFF',
        borderColor: '#0000FF',
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 40,
    },
    advisor: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#0000FF'
    },
    address: {
        fontSize: 16,
        color: '#0000FF',
        textAlign: 'center',
        marginBottom: 30,
    },
    email: {
        fontSize: 16,
        color: '#0000FF',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        width: '120%', // Adjusted to 100% width for better alignment
        alignSelf: 'center',
        position: 'absolute', // Position at the bottom
        bottom: 0 // Distance from the bottom of the screen
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
});

export default WelcomeScreen;
