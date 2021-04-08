import React from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  stopClock,
  clockRunning,
  timing,
  block,
} = Animated;

function runTiming(
  clock: any,
  value: any,
  dest: any,
  duration: number = 1000,
  isLoading: any
) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [set(config.toValue, dest)],
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        cond(isLoading, startClock(clock), stopClock(clock)),
      ]
    ),
    timing(clock, state, config),
    cond(state.finished, [
      set(state.finished, 0),
      set(state.position, value),
      set(state.frameTime, 0),
    ]),
    state.position,
  ]);
}

type Props = {
  paddingHorizontal?: number;
  duration?: number;
  isLoading?: boolean;
  color?: string;
  height?: number;
};

const Index = ({
  paddingHorizontal = 0,
  duration = 1000,
  isLoading = false,
  color = 'black',
  height = 1,
}: Props) => {
  const clock = new Clock();
  const screen = useWindowDimensions();
  const padding = paddingHorizontal * 2;
  const WIDTH = screen.width / 2 - padding;
  const transX = runTiming(clock, -WIDTH, WIDTH, duration, isLoading);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[{ height, backgroundColor: color }, { width: transX }]}
      />
      <Animated.View
        style={[{ height, backgroundColor: color }, { width: transX }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Index;
