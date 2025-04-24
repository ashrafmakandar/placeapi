import React, { useRef, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


import { GOOGLE_API_KEY } from '@env';


const Home=() =>{
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await AsyncStorage.getItem('search_history');
    console.log(data)
    if (data) {
      setSearchHistory(JSON.parse(data));
    }
  };

  const saveToHistory = async (location) => {
    const updated = [location, ...searchHistory.filter(item => item.place_id !== location.place_id)];
    setSearchHistory(updated);
    await AsyncStorage.setItem('search_history', JSON.stringify(updated));
  };

  const handlePlaceSelect = (data, details) => {
    if (!details?.geometry) return;


    const location = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      name: details.name,
      address: details.formatted_address,
      place_id: data.place_id,
    };

    setSelectedLocation(location);
    mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000);

    saveToHistory(location);
  };

  const handleHistorySelect = (location) => {
    setSelectedLocation(location);
    mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000);
  };

  return (
    <SafeAreaView >
      <View style={{
        marginHorizontal:"2%",backgroundColor:"#fff"
      }}>
         <GooglePlacesAutocomplete
        placeholder="Search places here"
        fetchDetails={true}
        onPress={handlePlaceSelect}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
        styles={{
          container: styles.autocompleteContainer,
          listView: styles.listView,
        }}
      />

      </View>
     

<MapView
        ref={mapRef}
    style={{
  height:Dimensions.get('window').height,
  width:Dimensions.get('window').width
    }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            title={selectedLocation.name}
            description={selectedLocation.address}
          />
        )}
      </MapView>


  

    
     
  { searchHistory.length>=1? 
  
 ( 
 <View    style={styles.historyList}>
  <Text style={[styles.historyTitle,{
    padding:5
  }]}>Searched Places </Text>
   <FlatList
        data={searchHistory}
        keyExtractor={(item) => item.place_id}
     
        contentContainerStyle={{
          paddingBottom:80
        }}
        renderItem={({ item }) => (
          
          <TouchableOpacity onPress={() => handleHistorySelect(item)} style={styles.historyItem}>
            <Text style={styles.historyTitle}>{item.name}</Text>
            <Text style={styles.historySubtitle}>{item.address}</Text>
          </TouchableOpacity>
        )}
      />

 </View>
):null}
   
  

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    position: 'absolute',
    top: 10,
    width: '100%',
    paddingHorizontal:"1%",
   
   borderRadius:8,borderWidth:1,borderColor:"#000",
    zIndex: 10,
    backgroundColor: 'white',
  },
  listView: {
    backgroundColor: 'white',
  },

  selectedPlace:{
      
    
    fontSize: 15,
    color: '#000',
  
    padding:5,
    fontWeight: 'bold'
  },
  historyList: {
    position: 'absolute',
   bottom: 20,
    backgroundColor: '#fff',
    width: '100%',
    maxHeight: 250,
   
    
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyTitle: {
    fontWeight: 'bold',
    fontSize:17
  },
  historySubtitle: {
    color: '#666',
  },
});
export default Home;