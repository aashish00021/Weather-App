import { ActivityIndicator, FlatList, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { REACT_APP_WEATHER_API_KEY } from '../../config';

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`
const API_KEY = REACT_APP_WEATHER_API_KEY;

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
  const [weather, setWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherByCity = async (city) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetch(
        `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await result.json();
      
      if (data.cod === '404') {
        setError('City not found');
        return null;
      }
      
      if (data.cod === 200) {
        return {
          city: data.name,
          time: new Date().toLocaleTimeString(),
          weather: data.weather[0].main,
          temp: Math.round(data.main.temp),
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          description: data.weather[0].description,
          feelsLike: Math.round(data.main.feels_like),
          pressure: data.main.pressure,
        };
      }
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    const weatherData = await fetchWeatherByCity(searchQuery);
    if (weatherData) {
      setSelectedWeather(weatherData);
      setModalVisible(true);
    }
  };

  const WeatherModal = ({ weather, visible, onClose }) => {
    if (!weather) return null;
    
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalCity}>{weather.city}</Text>
            <Text style={styles.modalTemp}>{weather.temp}°C</Text>
            <Text style={styles.modalWeather}>{weather.weather}</Text>
            <Text style={styles.modalDescription}>{weather.description}</Text>
            
            <View style={styles.weatherDetails}>
              <View style={styles.weatherDetail}>
                <Text style={styles.detailLabel}>Feels Like</Text>
                <Text style={styles.detailValue}>{weather.feelsLike}°C</Text>
              </View>
              <View style={styles.weatherDetail}>
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailValue}>{weather.humidity}%</Text>
              </View>
              <View style={styles.weatherDetail}>
                <Text style={styles.detailLabel}>Wind Speed</Text>
                <Text style={styles.detailValue}>{weather.windSpeed} m/s</Text>
              </View>
              <View style={styles.weatherDetail}>
                <Text style={styles.detailLabel}>Pressure</Text>
                <Text style={styles.detailValue}>{weather.pressure} hPa</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

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
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {isLoading && <ActivityIndicator size="large" color="#fff" />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <WeatherModal 
          weather={selectedWeather}
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
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
        flexDirection: 'row',
        gap: 10,
    },
    input: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 15,
        padding: 15,
        color: '#fff',
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#007AFF',
        borderRadius: 15,
        padding: 15,
        justifyContent: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#1C1C1E',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '600',
    },
    modalCity: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '700',
        marginTop: 20,
    },
    modalTemp: {
        color: '#fff',
        fontSize: 48,
        fontWeight: '700',
        marginVertical: 10,
    },
    modalWeather: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 5,
    },
    modalDescription: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 18,
        marginBottom: 20,
        textTransform: 'capitalize',
    },
    weatherDetails: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    weatherDetail: {
        width: '48%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
    },
    detailLabel: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
        marginBottom: 5,
    },
    detailValue: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
