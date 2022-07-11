import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizes } from '../untils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const CountDown = ({ 
  minutes = 1,
   isPaused, 
   onProgress,
   onEnd
    }) => {
  const [millis, setMillis] = useState(null);
  const interval = React.useRef(null);
  const Countdown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMillis(minutes));
      return timeLeft;
    });
  };
  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);
  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(Countdown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    padding: 24,
    color: 'white',
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
