import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import * as sqlite from 'expo-sqlite'
import {useState, useEffect} from 'react'

import Colors from '../../constants/Colors';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}


export default function TabLayout() {
  // constantes 
  const [logs,setLogs]:any = useState([])
  const [currentLog,setCurrentLog]:any = useState(undefined)
  const db = sqlite.openDatabase('myNewDB.db')
  function onInit() {
    db.transaction(tx=>{
      tx.executeSql('CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT)',undefined, (txObj, result)=>{}, (txObj,error)=>{console.log(error); return true})
    })
    db.transaction(tx=>{
      tx.executeSql('SELECT * FROM logs', undefined, (txObj, result)=>{setLogs(result.rows._array); console.log(logs);
      }, (txObj,error)=>{console.error(error); return true
      })
    })
  }
  function generateLog() {
    db.transaction(tx=>{
      tx.executeSql('INSERT INTO logs (date) VALUES (?)', [new Date().toString()], (txObj, result)=>{ let log = [...logs]; setCurrentLog(log)}, (txObj,error)=>true)
    })
  }
  
  
  useEffect(()=>{
    onInit()
    generateLog()
    console.log(logs);
  },[])
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'primer tab',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Segundo tab',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
