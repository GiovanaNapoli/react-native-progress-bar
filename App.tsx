import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Button, NativeBaseProvider, Box } from 'native-base';
import React from 'react';

type ProgresBarCustom = {
  steps: number;
  step: number;
  height: number
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20
  },
  containerProgress: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  progress: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    overflow: 'hidden',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  }
});


const ProgressBarCustom = ({ height, step, steps }: ProgresBarCustom) => {
  const [width, setWidth] = React.useState(0);
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;

  const handleOnLayout = (event: any) => {
    const newWidth = event.nativeEvent.layout.width;
    setWidth(newWidth);
  }

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [])

  React.useEffect(() => {
    reactive.setValue(-width + (width * step) / steps);
  }, [step, width])

  return(
    <>
      <Text>
        {step}/{steps}
        </Text>
      <View style={{...styles.containerProgress, height}} onLayout={
        (event) => handleOnLayout(event)
      }>
        <Animated.View style={{...styles.progress, height, transform: [{ translateX: animatedValue }]}} />
      </View>
    </>
  )
}

export default function App() {
  const [index, setIndex] = React.useState(0);

  const colors = StyleSheet.create({
    incrementButton: {
      backgroundColor: index === 4 ? '#c0392b' : '#2ecc71'
    },
    resetButton: {
      backgroundColor: index < 4 ? '#c0392b' : '#2ecc71'
    }
  });

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <StatusBar hidden />
        <ProgressBarCustom step={index} steps={4} height={20} />

        <Box style={styles.box}>
          <Button disabled={index === 4} style={colors.incrementButton} onPress={() => setIndex(index + 1)}>next step</Button>
          <Button disabled={index < 4} style={colors.resetButton} onPress={() => setIndex(0)}>reset steps</Button>
        </Box>
      </View>
    </NativeBaseProvider>
  );
}
