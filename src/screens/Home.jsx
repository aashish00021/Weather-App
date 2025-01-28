import { FlatList, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=30.73&lon=76.77&appid=e6f485d05d140ca676721d5496c118e5&units=metric`

const DATA = [
    {
        city:'Mohali',
        time: new Date(Date.now()).toLocaleTimeString(),
        weather: 'Clear',
        temp: 12,
    },
    {
        city:'Chandigarh',
        time: new Date(Date.now()).toLocaleTimeString(),
        weather: 'Clear',
        temp: 12,
    },
    {
        city:'Delhi',
        time: new Date(Date.now()).toLocaleTimeString(),
        weather: 'Clear',
        temp: 12,
    },
    {
        city:'Zirakpur',
        time: new Date(Date.now()).toLocaleTimeString(),
        weather: 'Clear',
        temp: 12,
    },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#000'}/>
      <View style={styles.main}>
        <Text style={styles.heading}>Weather App</Text>
        <View style={styles.searchContainer}>
          <TextInput 
            placeholder='Search for a city...'
            placeholderTextColor={'#8E8E93'}
            style={styles.input}
          />
        </View>

        <FlatList
          data={DATA}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({item}) => (
            <ImageBackground
              source={require('../assets/Background.jpg')}
              style={styles.weatherCard}
              imageStyle={styles.backgroundImage}
            >
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <View style={styles.cityTimeContainer}>
                    <Text style={styles.cityText}>{item.city}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                  <Text style={styles.weatherText}>{item.weather}</Text>
                </View>
                <View style={styles.tempContainer}>
                  <Text style={styles.tempText}>{item.temp}°C</Text>
                </View>
              </View>
            </ImageBackground>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    main: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 15,
    },
    heading: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 20,
    },
    searchContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 15,
        padding: 15,
        color: '#fff',
        fontSize: 16,
    },
    listContainer: {
        gap: 16,
    },
    weatherCard: {
        marginBottom: 16,
        borderRadius: 20,
        overflow: 'hidden',
    },
    backgroundImage: {
        borderRadius: 20,
        opacity: 0.8,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    leftContent: {
        flex: 1,
    },
    cityTimeContainer: {
        marginBottom: 8,
    },
    cityText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 4,
    },
    timeText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
    },
    weatherText: {
        color: '#fff',
        fontSize: 16,
        opacity: 0.9,
    },
    tempContainer: {
        padding: 12,
    },
    tempText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '700',
    },
});
