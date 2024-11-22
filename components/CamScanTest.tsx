import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

type ScanMode = 'QR Code' | 'Receipt';

export default function CamScanTest() {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [mode, setMode] = useState<ScanMode>('QR Code');
  const cameraRef = useRef< Camera | null>(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={[styles.swipeButton, { backgroundColor: '#4CAF50' }]}
        onPress={() => setMode('Receipt')}
      >
        <MaterialIcons name="receipt" size={24} color="white" />
        <Text style={styles.swipeButtonText}>Receipt</Text>
      </TouchableOpacity>
    );
  };

  const renderLeftActions = () => {
    return (
      <TouchableOpacity
        style={[styles.swipeButton, { backgroundColor: '#2196F3' }]}
        onPress={() => setMode('QR Code')}
      >
        <MaterialIcons name="qr-code-scanner" size={24} color="white" />
        <Text style={styles.swipeButtonText}>QR Code</Text>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <MaterialIcons name="flip-camera-ios" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
      <GestureHandlerRootView
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        friction={2}
        rightThreshold={40}
        leftThreshold={40}
      >
        <View style={styles.swipeContainer}>
          <MaterialIcons 
            name={mode === 'QR Code' ? 'qr-code-scanner' : 'receipt'} 
            size={24} 
            color="white" 
          />
          <Text style={styles.swipeText}>{mode}</Text>
        </View>
      </GestureHandlerRootView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 30,
    padding: 15,
  },
  swipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: 20,
  },
  swipeText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  swipeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2,
  },
  swipeButtonText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
});

