import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

const duration = 2000;

export default function HomeScreen() {
  const defaultAnim = useSharedValue(200);
  const linear = useSharedValue(200);
  const width = useSharedValue(100);

  const animatedDefault = useAnimatedStyle(() => ({
    transform: [{translateX: defaultAnim.value}],
  }));
  const animatedChanged = useAnimatedStyle(() => ({
    transform: [{translateX: linear.value}],
  }));

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  React.useEffect(() => {
    linear.value = withRepeat(
      // highlight-next-line
      withTiming(-linear.value, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
    defaultAnim.value = withRepeat(
      // highlight-next-line
      withTiming(-defaultAnim.value, {
        duration,
      }),
      -1,
      true,
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text>{'React Native Animations'}</Text>
      {/* On button press */}
      <Animated.View style={{...styles.box2, width}} />
      <Button onPress={handlePress} title="Increase Size" />

      {/* With transition and auto animate */}
      <Animated.View style={[styles.box, animatedDefault]}>
        <Text style={styles.text}>1</Text>
      </Animated.View>
      <Animated.View style={[styles.box, animatedChanged]}>
        <Text style={styles.text}>2</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  box: {
    height: 80,
    width: 80,
    margin: 20,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  box2: {
    height: 100,
    width: 100,
    backgroundColor: '#D2F801',
    borderRadius: 20,
    marginVertical: 64,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
  },
});
