/* eslint-disable prettier/prettier */
import React from 'react';

import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Sound from 'react-native-sound';
const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ADD8E6', // Set to light blue
    borderRadius: 8,
    padding: 16,
    margin: 8,
    width: '100%', // Set width as needed
    height: 100, // Set height as needed
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageBox: {
    width: 60,
    height: 70,
    backgroundColor: 'lightgray', // Set to your desired color or use an image
    marginRight: 16, // Adjust margin as needed
  },
});

Sound.setCategory('Playback');

const Card = ({title, navigation}: {title: string, navigation:any}) => {
  const handleCardPress = () => {
    // Do something
    navigation.navigate('Details', {title});
    const value = title.replace(' ', '_').toLowerCase();
    // Load the sound file 'whoosh.mp3' from the app bundle
    // // See notes below about preloading sounds within initialization code below.
    // var whoosh = new Sound(`${value}.mp3`, Sound.MAIN_BUNDLE, (error) => {
    //   if (error) {
    //     console.log('failed to load the sound', error);
    //     return;
    //   }
    //   // loaded successfully
    //   console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

    //   // Play the sound with an onEnd callback
    //   whoosh.play((success) => {
    //     if (success) {
    //       console.log('successfully finished playing');
    //     } else {
    //       console.log('playback failed due to audio decoding errors');
    //     }
    //   });
    // });

  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        {/* Image Box */}
        <View style={styles.imageBox}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={require('../assets/kalika.jpg')}
          />
        </View>

        <View>
          <Text style={{color: 'white', fontWeight: '900', fontSize: 18}}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
