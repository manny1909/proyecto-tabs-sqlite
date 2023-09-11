import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import * as sqlite from 'expo-sqlite'
import { useState } from 'react';

export default function TabOneScreen() {
  const db = sqlite.openDatabase('myNewDB.db')
  const [currentLog,setCurrentLog]:any = useState(undefined)
  function generateLog() {
    db.transaction(tx=>{
      tx.executeSql('INSERT INTO logs (date) VALUES (?)', [new Date().toString()], (txObj, result)=>{ setCurrentLog(result); console.log(currentLog);
      }, (txObj,error)=>true)
    })
  }
  const deleteAllLog = ()=> {
    db.transaction(tx=>{
      tx.executeSql('DELETE FROM logs',undefined,(sqlObj,result)=>{console.log(result.rows._array,'asdad');
      }, (sqlObj,error)=>{console.error(error); return true
      })
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Button
        onPress={generateLog}
        title="Generar Log"
        color="#841584"
        accessibilityLabel="genera log"
      />
    </View>
  );
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
