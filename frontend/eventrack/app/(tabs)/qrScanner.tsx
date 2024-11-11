import { CameraView, CameraType, useCameraPermissions, ScanningResult } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App(navigation : any) {
  const[scanned, setScanned] = useState(false);
  const[data, setData] = useState<string | null>(null);

  const handleBarCodeScanned = ({ data }: ScanningResult) => {
    setScanned(true);
    setData(`Bar code with data ${data} has been scanned! at ${timestamp}`);
    console.log(`Bar code with data ${data} has been scanned! at ${timestamp}`)
  };



  const getCurrentTimestamp = (): string => {
    const now = new Date();
    return now.toLocaleString(); // or you can use any other format you prefer
    
  };

  const timestamp = getCurrentTimestamp();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (scanned && permission) {
    return(
      <View style={styles.container}>
        <Text style={styles.message}>${data}</Text>
        <Button title="Close" onPress={() => {setScanned(false)}} />
      </View>

    )
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  if (!scanned){
  return (
    <View style={styles.container}>
      <CameraView
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
      onBarcodeScanned={(data:ScanningResult) => {handleBarCodeScanned(data)}}
      style={styles.camera} facing={facing}>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("QRCreate")}>
            <Text style={styles.text}>Go to QR Create</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  )
}
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
