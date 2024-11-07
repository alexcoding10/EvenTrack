import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();
import index from './index';

export default function RootLayout() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={index} // Aquí debes definir o importar IndexScreen
          options={{
            headerStyle: styles.header, // Si quieres aplicar estilos al header
            headerTitleAlign: 'center',  // Centra el título del header
          }}
        />
      </Stack.Navigator>
    );
  }

  const styles = StyleSheet.create({
    header: {
      backgroundColor: '#f8f9fa',
    },
  });