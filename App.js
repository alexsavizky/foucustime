import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
const STATUSES = {
  COMPLETE: 1,
  CANCELED: 2,
};
export default function App() {
  const [focusSubject, setFoucusSubject] = useState(null);
  const [focusHistory, setfocusHistory] = useState([]);

  const addFocusHistorySubjectwithState = (subject, status) => {
    setfocusHistory([...focusHistory, { subject, status }]);
  };

  const onClear = () => {
    setfocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setfocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(()=>{
    loadFocusHistory(); 
  },[])
  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectwithState(focusSubject, STATUSES.COMPLETE);
            setFoucusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectwithState(focusSubject, STATUSES.CANCELED);
            setFoucusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFoucusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252250',
    padding: 20,
  },
});
