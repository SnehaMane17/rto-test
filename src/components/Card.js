import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const Card = ({ title, description, onPress, iconName }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.content}>
      <Icon name={iconName} size={40} color="#fff" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#007bff',
    padding: 20,
    marginVertical: 10,
    width: width * 0.9,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'flex-start',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginTop: 6,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
    // fontFamily: 'SourceSansPro-Regular'
  },
  description: {
    fontSize: 14,
    color: '#fff',
    // fontFamily: 'SourceSansPro-Regular'
  },
});

export default Card;
