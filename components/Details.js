import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';

import { lyrics } from '../assets/lyrics/';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // Add other container styles as needed
      },
      lyricsContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // Add other styles for the lyrics container as needed
      },
      lyricsText: {
        // Add styles for the lyrics text as needed
        color: 'black',
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center',
        
      },
      controlsContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // Add other styles for the controls container as needed
      },
      playPauseButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        // Add other styles for the play/pause button as needed
      },
      playPauseButtonText: {
        color: 'white',
        // Add other styles for the play/pause button text as needed
      },
      slider: {
        width: '80%',
        alignSelf: 'center',
        marginTop: 10,
      },
      sliderControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        // Add other styles for the slider controls as needed
      },
  });

  
const Details = ({route}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [text, setLyrics] = useState('');
    const {title} = route.params;
    const value = title.replace(' ', '_').toLowerCase();
    const whooshRef = useRef(new Sound(`${value}.mp3`, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + whooshRef.current.getDuration() + 'number of channels: ' + whooshRef.current.getNumberOfChannels());
      }));
    const [sliderValue, setSliderValue] = useState(0);
    const [playSeconds, setPlaySeconds] = useState(0);

    useEffect(() => {
      whooshRef.current = new Sound(`${value}.mp3`, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + whooshRef.current.getDuration() + 'number of channels: ' + whooshRef.current.getNumberOfChannels());
      });
  
      return () => {
        if (whooshRef.current) {
          whooshRef.current.release();
        }
      };
    }, [value]);
  
    useEffect(() => {
      setLyrics(lyrics.kalika_ashtakam);
    }, []);
  
    const handlePress = () => {
      if (whooshRef.current) {
        if (!isPlaying) {
          // Play the sound with an onEnd callback
          whooshRef.current.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });

          // Set interval to update the slider position
        const intervalId = setInterval(() => {
            whooshRef.current.getCurrentTime((seconds) => {
              setPlaySeconds(seconds);
            });
          }, 1000);
          setIsPlaying(true);
          // Save intervalId to clear the interval later
          whooshRef.current.intervalId = intervalId;

        } else {
          // If playing, pause the audio
          whooshRef.current.pause(() => {
            console.log('successfully paused');
            setIsPlaying(false);
            if (whooshRef.current.intervalId) {
                clearInterval(whooshRef.current.intervalId);
              }
          });
        }
  
        // Toggle the play/pause state
       
      }
    };

    const handleSliderChange = (value) => {
        // Update the slider value and seek the audio to the new position
        
        setPlaySeconds(value);
        if (whooshRef.current) {
          whooshRef.current.setCurrentTime(value);
        }
      };
  

      const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };
  
    return (
        
        <View style={styles.container}>
        <Text style={{ color: 'black', fontWeight: '900', fontSize: 18 }}>{title}</Text>
        
        <ScrollView contentContainerStyle={styles.lyricsContainer}>
          {/* Add your lyrics display here */}
          <Text style={styles.lyricsText}>
            {text}
          </Text>
        </ScrollView>

        <View style={styles.controlsContainer}>
            <View style={styles.sliderControls}>
                    <Text style={{ color: 'black', fontWeight: '900', fontSize: 10 }}>{formatTime(playSeconds)}</Text>
                    {/* Slider Control */}
                        <Slider
                        style={styles.slider}
                        value={playSeconds}
                        onValueChange={handleSliderChange}
                        minimumValue={0}
                        maximumValue={whooshRef.current ? whooshRef.current.getDuration() : 0}
                        minimumTrackTintColor="#00BFFF"
                        maximumTrackTintColor="#000000"
                        thumbTintColor='white'
                        step={1}
                        />
                     <Text style={{ color: 'black', fontWeight: '900', fontSize: 10 }}>{formatTime(whooshRef.current.getDuration())}</Text>
            </View>
          <TouchableOpacity style={styles.playPauseButton} onPress={handlePress}>
            <Text style={styles.playPauseButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
          {/* Add other controls as needed */}
        </View>
      </View>
    );
}

export default Details;