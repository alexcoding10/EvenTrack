import React from 'react';
import { View, Image, Text } from 'react-native';

const RenderQRCode = ({ qrCode }: { qrCode: string }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Your QR Code:</Text>
      <Image 
        source={{ uri: qrCode }} 
        style={{ width: 200, height: 200, borderWidth: 1, borderColor: '#ccc' }} 
      />
    </View>
  );
};

export default RenderQRCode;
