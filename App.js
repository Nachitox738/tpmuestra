import * as React from 'react';
import { Text, View, Pressable, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



function OpcionesPCScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    
      <View style={{width:'100%', height: '20%'}}>
      <Pressable onPress={()=>navigation.navigate('Clases')}  style={stylesContainer.boton }><Text style={stylesContainer.texto }>Clases</Text></Pressable>
      </View>

      <View style={{width:'100%', height: '20%'}}>
      <Pressable onPress={()=>navigation.navigate('Razas')} style={stylesContainer.boton }><Text style={stylesContainer.texto }>Razas</Text></Pressable>
      </View>

      <View style={{width:'100%', height: '20%'}}>
      <Pressable onPress={()=>navigation.navigate('Trasfondos')} style={stylesContainer.boton }><Text style={stylesContainer.texto }>Trasfondos</Text></Pressable>
      </View>

      <View style={{width:'100%', height: '20%'}}>
      <Pressable onPress={()=>navigation.navigate('Hechizos')} style={stylesContainer.boton }><Text style={stylesContainer.texto }>Hechizos</Text></Pressable>
      </View>

    </View>    
  );
  
}

function ClasesScreen(){
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Clases de PC!</Text>
    </View>
  );
}

function RazasScreen(){
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Razas de PC!</Text>
    </View>
  );
}

function TrasfondosScreen(){
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Trasfondos de PC!</Text>
    </View>
  );
}

function HechizosScreen(){
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hechizos de PC!</Text>
    </View>
  );
}
const OpcionesPCStack = createNativeStackNavigator();

function OpcionesPCStackScreen(){
  return(
    <OpcionesPCStack.Navigator  screenOptions={{headerStyle: {
      backgroundColor: '#B75454',
    }, headerTitleStyle:{
      color:'#fff'
    },
    headerTitleAlign:'center'}} >
      <OpcionesPCStack.Screen name="Opciones PC" component={OpcionesPCScreen} />
      <OpcionesPCStack.Screen name="Clases" component={ClasesScreen}/> 
      <OpcionesPCStack.Screen name="Razas" component={RazasScreen}/> 
      <OpcionesPCStack.Screen name="Trasfondos" component={TrasfondosScreen} /> 
      <OpcionesPCStack.Screen name="Hechizos" component={HechizosScreen}/> 
    </OpcionesPCStack.Navigator>
  );
}

function PersonajesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Personajes!</Text>
    </View>
  );
}

function BestiarioScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bestiario!</Text>
    </View>
  );
}

function ReferenciasScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Referencias!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Opciones PC Stack" component={OpcionesPCStackScreen} />
        <Tab.Screen name="Personajes" component={PersonajesScreen} />
        <Tab.Screen name="Bestiario" component={BestiarioScreen} />
        <Tab.Screen name="Referencias" component={ReferenciasScreen} />


      </Tab.Navigator>
    </NavigationContainer>
  );
}

const stylesContainer = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#B75454',
  },
  boton: {
    width: '100%',
    height: '80%',
    borderWidth: 4,
    borderColor: '#000',
    borderRadius: 6,
    backgroundColor: '#b75454',
  },
  texto:{
    paddingTop:'8.5%',
    color:'#fff',
    textAlign:'center',
    justifyContent:'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});