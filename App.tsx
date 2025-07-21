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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D3A',
  },
});

export default App;