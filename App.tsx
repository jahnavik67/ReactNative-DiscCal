<<<<<<< HEAD
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { DiscountCalculatorScreen } from './src/components/calculator/DiscountCalculatorScreen';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2D2D3A" />
      <DiscountCalculatorScreen />
    </View>
  );
}
=======
  import React from 'react';
  import { View, StyleSheet, StatusBar } from 'react-native';
  import { DiscountCalculatorScreen } from './src/components/calculator/DiscountCalculatorScreen';

  function App(): React.JSX.Element {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2D2D3A" />
        <DiscountCalculatorScreen />
      </View>
    );
  }
>>>>>>> d5536153b4499965b369840a4b696b265758f322

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D3A',
  },
});

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> d5536153b4499965b369840a4b696b265758f322
