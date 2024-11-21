import * as React from 'react';
import { Text, View, Pressable, Image, StyleSheet, Alert, Modal, ScrollView, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
const apiurl = "https://api.open5e.com/v1/classes/?name=";
const buscarClase = async (nombre, campo) => {
  try {
    apiurlconc = apiurl+nombre;
    console.log(apiurlconc)
    const response = await axios.get(apiurlconc);
    if(campo == "name"){
      if (response.data && response.data.results[0].name !== undefined) {
        return "Clase: "+response.data.results[0].name+"\n";
      } else {
        return "No se encontró el nombre.";
      }
    }
    if(campo == "hit_dice"){
      if (response.data && response.data.results[0].hit_dice !== undefined) {
        return "Dados de Golpe: "+response.data.results[0].hit_dice+"\n";
      } else {
        return "No se encontró el hit dice.";
      }
    }
    if(campo == "hp_at_1st_level"){
      if (response.data && response.data.results[0].hp_at_1st_level !== undefined) {
        return "Puntos de Vida a Nivel 1: "+response.data.results[0].hp_at_1st_level+"\n";
      } else {
        return "No se encontró el hp a primer nivel.";
      }
    }
    if(campo == "hp_at_higher_levels"){
      if (response.data && response.data.results[0].hp_at_higher_levels !== undefined) {
        return "Puntos de Vida a Niveles Mayores"+response.data.results[0].hp_at_higher_levels+"\n";
      } else {
        return "No se encontró el hp a niveles mayores.";
      }
    }
    if(campo == "prof_armor"){
      if (response.data && response.data.results[0].prof_armor !== undefined) {
        return "Proficiencia en Armaduras: "+response.data.results[0].prof_armor+"\n";
      } else {
        return "No se encontró la proficiencia en armaduras.";
      }
    }
    if(campo == "prof_weapons"){
      if (response.data && response.data.results[0].prof_weapons !== undefined) {
        return "Proficiencia en Armas: "+response.data.results[0].prof_weapons+"\n";
      } else {
        return "No se encontró la proficiencia en armas.";
      }
    }
    if(campo == "prof_saving_throws"){
      if (response.data && response.data.results[0].prof_saving_throws !== undefined) {
        return "Proficiencia en Tiradas de Salvacion: "+response.data.results[0].prof_saving_throws+"\n";
      } else {
        return "No se encontró la proficiencia en saves.";
      }
    }
    if(campo == "prof_skills"){
      if (response.data && response.data.results[0].prof_skills !== undefined) {
        return "Proficiencia en Habilidades: "+response.data.results[0].prof_skills+"\n";
      } else {
        return "No se encontró la proficiencia en habilidades.";
      }
    }
    if(campo == "equipment"){
      if (response.data && response.data.results[0].equipment !== undefined) {
        return "Equipamiento Inicial: "+response.data.results[0].equipment+"\n";
      } else {
        return "No se encontró el equipamiento inicial.";
      }
    }
    if(campo == "spellcasting_ability"){
      if (response.data && response.data.results[0].spellcasting_ability !== undefined) {
        return "Spellcasting: "+response.data.results[0].spellcasting_ability+"\n";
      } else {
        return "No se encontró el spellcasting.";
      }
    }
    if(campo == "desc"){
      if (response.data && response.data.results[0].desc !== undefined) {
        return "Descripcion: "+response.data.results[0].desc+"\n";
      } else {
        return "No se encontró la descripcion.";
      }
    }
    
  } catch (error) {
    console.log('Error fetching data:', error);
    return "Error al cargar la clase.";
  }
};
apiurlRaza = "https://api.open5e.com/v2/races/srd_"
const buscarRaza = async (nombre) => {
  try {
    let apiurlRazaconc = apiurlRaza+nombre+'/';
    console.log(apiurlRazaconc)
    const response = await axios.get(apiurlRazaconc);
    let arrRaza = [];
    let contRaza = 0;
    arrRaza[contRaza] = response.data.name+"\n";
    contRaza++;    
    arrRaza[contRaza] = response.data.desc+"\n";
    contRaza++;
    for(let j=0; j<response.data.traits.length;j++){
      arrRaza[contRaza] = response.data.traits[j].name+":\n";
      contRaza++;
      arrRaza[contRaza] = response.data.traits[j].desc+"\n\n";
      contRaza++;
    }
    return arrRaza
  } catch (error) {
    console.log('Error fetching data:', error);
    return "Error al cargar la raza.";
  }
};
apiurlBack = "https://api.open5e.com/v2/backgrounds/a5e-ag_"
const buscarBack = async (nombre) => {
  try {
    let apiurlBackconc = apiurlBack+nombre+'/';
    console.log(apiurlBackconc)
    const response = await axios.get(apiurlBackconc);
    let arrBack = [];
    let contBack = 0;
    arrBack[contBack] = response.data.name+"\n";
    contBack++;    
    arrBack[contBack] = response.data.desc+"\n";
    contBack++;
    for(let j=0; j<response.data.benefits.length;j++){
      arrBack[contBack] = response.data.benefits[j].name+":\n";
      contBack++;
      arrBack[contBack] = response.data.benefits[j].desc+"\n";
      contBack++;
      arrBack[contBack] = response.data.benefits[j].type+"\n\n";
      contBack++;
    }
    return arrBack
  } catch (error) {
    console.log('Error fetching data:', error);
    return "Error al cargar el transfondo.";
  }
};
apiurlSpell = "https://api.open5e.com/v2/spells/a5e-ag_"
const buscarSpell = async (nombre) => {
  try {
    let apiurlSpellconc = apiurlSpell+nombre+'/';
    console.log(apiurlSpellconc)
    const response = await axios.get(apiurlSpellconc);
    let arrSpell = [];
    let contSpell = 0;
    arrSpell[contSpell] = response.data.name+"\n";
    contSpell++;    
    if(response.data.level == 0){
      arrSpell[contSpell] = response.data.school.name+" Cantrip \n";
    }
    else{
      arrSpell[contSpell] = "Level "+String(response.data.level)+" "+response.data.school.name+"\n";
    }
    contSpell++;
    arrSpell[contSpell] = "Casting time:"+response.data.casting_time+"\n";
    contSpell++;
    arrSpell[contSpell] = "Range:"+response.data.range+"ft\n";
    contSpell++;
    arrSpell[contSpell] = "Components: ";
    if(response.data.verbal==true){
      arrSpell[contSpell]+="V "
    }
    if(response.data.somantic==true){
      arrSpell[contSpell]+="S "
    }
    if(response.data.material==true){
      arrSpell[contSpell]+="M"
    }
    arrSpell[contSpell]+="\n"
    contSpell++;
    arrSpell[contSpell] = "Duration:"+response.data.duration+"\n";
    contSpell++;
    if(response.data.concentration == true){
      arrSpell[contSpell] = "Requires Concentration\n";
      contSpell++;
    }
    arrSpell[contSpell] = response.data.desc+"\n";
    contSpell++;
    arrSpell[contSpell] = response.data.higher_level+"\n";
    contSpell++;
    return arrSpell
  } catch (error) {
    console.log('Error fetching data:', error);
    return "Error al cargar el hechizo.";
  }
};
apiurlCombat = "https://api.open5e.com/v1/sections/?name="
const buscarCombat = async (nombre) => {
  try {
    let apiurlCombatconc = apiurlCombat+nombre;
    console.log(apiurlCombatconc)
    const response = await axios.get(apiurlCombatconc);
    let arrCombat = [];
    let contCombat = 0;
    arrCombat[contCombat] = response.data.results[0].name+"\n";
    contCombat++;    
    arrCombat[contCombat] = response.data.results[0].desc+" ";
    contCombat++;
    return arrCombat
  } catch (error) {
    console.log('Error fetching data:', error);
    return "Error al cargar el enemigo.";
  }
};

apiurlEnemy = "https://api.open5e.com/v1/monsters/?name="
const buscarEnemy = async (nombre) => {
  try {
    let apiurlEnemyconc = apiurlEnemy+nombre;
    console.log(apiurlEnemyconc)
    const response = await axios.get(apiurlEnemyconc);
    let arrEnemy = [];
    let contEnemy = 0;
    arrEnemy[contEnemy] = response.data.results[0].name+"\n";
    contEnemy++;    
    arrEnemy[contEnemy] = response.data.results[0].size+" ";
    arrEnemy[contEnemy] = response.data.results[0].type+"\n";
    contEnemy++;
    arrEnemy[contEnemy] = "AC:"+response.data.results[0].armor_class+"\n";
    contEnemy++;
    arrEnemy[contEnemy] = "HP:"+response.data.results[0].hit_points+"\n";
    contEnemy++;
    arrEnemy[contEnemy] = "Str:"+response.data.results[0].strength+"  "+"Dex:"+response.data.results[0].dexterity+"\n";
    contEnemy++;
    arrEnemy[contEnemy] = "Con:"+response.data.results[0].constitution+"  "+"Int:"+response.data.results[0].intelligence+"\n";
    contEnemy++;
    arrEnemy[contEnemy] = "Wis:"+response.data.results[0].wisdom+"  "+"Cha:"+response.data.results[0].charisma+"\n";
    contEnemy++;
    arrEnemy[contEnemy] = "Senses:"+response.data.results[0].senses+"\n";
    contEnemy++;
    arrEnemy[contEnemy] = "CR:"+response.data.results[0].challenge_rating+"\n";
    contEnemy++;
    arrEnemy[contEnemy] = "Actions:\n"
    contEnemy++;
    response.data.results[0].actions.forEach(accion => {
      arrEnemy[contEnemy] = accion.name+"\n";
      contEnemy++;
      arrEnemy[contEnemy] = accion.desc+"\n";
      contEnemy++;
    });
    response.data.results[0].special_abilities.forEach(accion => {
      arrEnemy[contEnemy] = accion.name+"\n";
      contEnemy++;
      arrEnemy[contEnemy] = accion.desc+"\n";
      contEnemy++;
    });
    
    
    return arrEnemy
  } catch (error) {
    console.log('Error fetching data:', error);
    return "Error al cargar el enemigo.";
  }
};
arrCamps = ["name", "hit_dice", "hp_at_1st_level", "hp_at_higher_levels", "prof_armor", "prof_weapons", "prof_saving_throws", "prof_skills", "equipment", "spellcasting_ability", "desc"];
function OpcionesPCScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    
      <View style={{width:'100%', height: '20%'}}>  
      <Pressable onPress={()=>navigation.navigate('Clases')}  style={stylesContainer.boton }><Text style={stylesContainer.texto }>
      <Image style={imagen.tinyLogo} source={require('./iconos/estrella.png')}/>Clases</Text></Pressable>
      </View>      

      <View style={{width:'100%', height: '20%'}}>
      <Pressable onPress={()=>navigation.navigate('Razas')} style={stylesContainer.boton }><Text style={stylesContainer.textos }>
      <Image style={imagen.tinyLogo} source={require('./iconos/cara.png')}/>Especies</Text></Pressable>{/* cara */}
      </View>

      <View style={{width:'100%', height: '20%'}}>
      <Pressable onPress={()=>navigation.navigate('Trasfondos')} style={stylesContainer.boton }><Text style={stylesContainer.texto }>
      <Image style={imagen.tinyLogo} source={require('./iconos/trasfondo.png')}/>Trasfondos</Text></Pressable>{/* libro */}
      </View>

      <View style={{width:'100%', height: '20%'}}>
      <Pressable onPress={()=>navigation.navigate('Hechizos')} style={stylesContainer.boton }><Text style={stylesContainer.texto }>
      <Image style={imagen.tinyLogo} source={require('./iconos/fuego.png')}/>Hechizos</Text></Pressable>{/* fuego */}
      </View>
    

    </View>    
  );

}


function ClasesScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textoClase, settextoClase] = React.useState("Cargando, Espere un momento.");
  let arrtext = []
  const [selectedId, setSelectedId] = React.useState(null);

  const handlePress = (id) => {
    setSelectedId(id); // Reemplaza el ID anterior con el actual
    setModalVisible(true);
  };

  React.useEffect(() => {
    if (modalVisible) {
      const fetchData = async () => {
        for(let i = 0; i<arrCamps.length;i++){
          arrtext[i] = await buscarClase(selectedId, arrCamps[i]);
        }
        settextoClase(arrtext);
      };
      arrtext = []
      settextoClase("Cargando, Espera un momento.")
      fetchData();
    }
  }, [modalVisible]);

  return (
   
  
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:30, marginBottom:20}}>Clases de PC!</Text>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}>
          
     <ScrollView>
        <View  style={stodal.modalView}>
          <Text style={stodal.modalText}>{textoClase}</Text>
          <Pressable onPress={() => {
            setModalVisible(!modalVisible);
          }}>
            <Text>Cerrar</Text>
          </Pressable>
          
        </View>
     </ScrollView>
      </Modal>

      <Pressable id='Barbarian' onPress={() => { 
        handlePress('Barbarian');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Barbaro</Text>
      </Pressable>
      <Pressable id='Bard' onPress={() => {
        handlePress('Bard');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Bardo</Text>
      </Pressable>
      <Pressable id='Warlock' onPress={() => {
        handlePress('Warlock');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Brujo</Text>
      </Pressable>
      <Pressable id='Cleric' onPress={() => {
        handlePress('Cleric');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Clerigo</Text>
      </Pressable>
      <Pressable id='Druid' onPress={() => {
        handlePress('Druid');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Druida</Text>
      </Pressable>
      <Pressable id='Ranger' onPress={() => {
        handlePress('Ranger');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Explorador</Text>
      </Pressable>
      <Pressable id='Fighter' onPress={() => {
        handlePress('Fighter');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Guerrero</Text>
      </Pressable>
      <Pressable id='Sorcerer' onPress={() => {
        handlePress('Sorcerer');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Hechicero</Text>
      </Pressable>
      <Pressable id='Wizard' onPress={() => {
        handlePress('Wizard');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Mago</Text>
      </Pressable>
      <Pressable id='Monk' onPress={() => {
        handlePress('Monk');      
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Monje</Text>
      </Pressable>
      <Pressable id='Paladin' onPress={() => {
        handlePress('Paladin');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Paladin</Text>
      </Pressable>
      <Pressable id='Rogue' onPress={() => {
        handlePress('Rogue');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Picaro</Text>
      </Pressable>
     
   
  </View>
  );
}
function RazasScreen(){
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textoClase, settextoClase] = React.useState("Cargando, Espere un momento.");
  const [selectedId, setSelectedId] = React.useState(null);
  let arrActu = []
  const handleRaza = (id) => {
    setSelectedId(id); // Reemplaza el ID anterior con el actual
    setModalVisible(true);
  };
  React.useEffect(() => {
    if (modalVisible) {
      const fetchDataRaza = async () => {
        arrActu = await buscarRaza(selectedId)
        settextoClase(arrActu);
        
      };
      arrActu = []
      settextoClase("Cargando, Espera un momento.")
      fetchDataRaza();
      
    }
  }, [modalVisible]);
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:30, marginBottom:20}}>Razas de PC </Text>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}>
        
     <ScrollView>
        <View  style={stodal.modalView}>
          <Text style={stodal.modalText}>{textoClase}</Text>
          <Pressable onPress={() => {
            setModalVisible(!modalVisible);
          }}>
            <Text>Cerrar</Text>
          </Pressable>
        </View>
        </ScrollView>
      </Modal>

      
      <Pressable id='dwarf' onPress={() => {
        handleRaza('dwarf');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Enano</Text>
      </Pressable>
      <Pressable id='elf' onPress={() => {
        handleRaza('elf');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Elfo</Text>
      </Pressable>
      <Pressable id='halfling' onPress={() => {
        handleRaza('halfling');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Mediano</Text>
      </Pressable>
      <Pressable id='human' onPress={() => {
        handleRaza('human');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Humano</Text>
      </Pressable>
      <Pressable id='dragonborn' onPress={() => {
        handleRaza('dragonborn');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Draconido</Text>
      </Pressable>
      <Pressable id='gnome' onPress={() => {
        handleRaza('gnome');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Gnomo</Text>
      </Pressable>
      <Pressable id='tiefling' onPress={() => {
        handleRaza('tiefling');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Tiflin</Text>
      </Pressable>
    </View>
  );
}

function TrasfondosScreen(){
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textoClase, settextoClase] = React.useState("Cargando, Espere un momento.");
  const [selectedId, setSelectedId] = React.useState(null);
  let arrActu = []
  const handleBack = (id) => {
    setSelectedId(id); // Reemplaza el ID anterior con el actual
    setModalVisible(true);
  };
  React.useEffect(() => {
    if (modalVisible) {
      const fetchDataBack = async () => {
        arrActu = await buscarBack(selectedId)
        settextoClase(arrActu);
        
      };
      arrActu = []
      settextoClase("Cargando, Espera un momento.")
      fetchDataBack();
      
    }
  }, [modalVisible]);
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:30, margin:7}}>Trasfondos de PC!</Text>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}>
        <ScrollView>
           <View  style={stodal.modalView}>
             <Text style={stodal.modalText}>{textoClase}</Text>
          <Pressable onPress={() => {
            setModalVisible(!modalVisible);
          }}>
            <Text>Cerrar</Text>
          </Pressable>
        </View>
    </ScrollView>
      </Modal>

      
      <Pressable id='acolyte' onPress={() => {
        handleBack('acolyte');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Acolito</Text>
      </Pressable>
      <Pressable id='artisan' onPress={() => {
        handleBack('artisan');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Artesano</Text>
      </Pressable>
      <Pressable id='charlatan' onPress={() => {
        handleBack('charlatan');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Charlatan</Text>
      </Pressable>
      <Pressable id='criminal' onPress={() => {
        handleBack('criminal');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Criminal</Text>
      </Pressable>
      <Pressable id='hermit' onPress={() => {
        handleBack('hermit');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Ermitaño</Text>
      </Pressable>
      <Pressable id='outlander' onPress={() => {
        handleBack('outlander');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Forastero</Text>
      </Pressable>
      <Pressable id='folk-hero' onPress={() => {
        handleBack('folk-hero');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC}>Heroe del pueblo</Text>
      </Pressable>
      <Pressable id='urchin' onPress={() => {
        handleBack('urchin');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Huerfano</Text>
      </Pressable>
      <Pressable id='sailor' onPress={() => {
        handleBack('sailor');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Marinero</Text>
      </Pressable>
      <Pressable id='noble' onPress={() => {
        handleBack('noble');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Noble</Text>
      </Pressable>
      <Pressable id='sage' onPress={() => {
        handleBack('sage');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Sabio</Text>
      </Pressable>
      <Pressable id='soldier' onPress={() => {
        handleBack('soldier');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Soldado</Text>
      </Pressable>
    </View>
  );
}

function HechizosScreen(){
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textoClase, settextoClase] = React.useState("Cargando, Espere un momento.");
  const [selectedId, setSelectedId] = React.useState(null);
  let arrActu = []
  const handleSpell = (id) => {
    setSelectedId(id); // Reemplaza el ID anterior con el actual
    setModalVisible(true);
  };
  React.useEffect(() => {
    if (modalVisible) {
      const fetchDataSpell = async () => {
        arrActu = await buscarSpell(selectedId)
        settextoClase(arrActu);
        
      };
      arrActu = []
      settextoClase("Cargando, Espera un momento.")
      fetchDataSpell();
      
    }
  }, [modalVisible]);
  return(
    <ScrollView>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:30, marginTop:40}}>Hechizos de PC!</Text>
      <Text style={{fontSize:25, margin:5}}>Cantrips</Text>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}>
      <ScrollView>
           <View  style={stodal.modalView}>
             <Text style={stodal.modalText}>{textoClase}</Text>
          <Pressable onPress={() => {
            setModalVisible(!modalVisible);
          }}>
            <Text>Cerrar</Text>
          </Pressable>
        </View>
        </ScrollView>
      </Modal>

      
      <Pressable id='acid-splash' onPress={() => {
        handleSpell('acid-splash');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Acid Splash</Text>
      </Pressable>
      <Pressable id='fire-bolt' onPress={() => {
        handleSpell('fire-bolt');
      }}style={stylesContainer.pc3}>
        <Text style={stylesContainer.textoPC}>Fire Bolt</Text>
      </Pressable>
      <Pressable id='guidance' onPress={() => {
        handleSpell('guidance');
      }}style={stylesContainer.pc3}>
        <Text style={stylesContainer.textoPC}>Guidance</Text>
      </Pressable>
      <Pressable id='mage-hand' onPress={() => {
        handleSpell('mage-hand');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Mage Hand</Text>
      </Pressable>
      <Pressable id='prestidigitation' onPress={() => {
        handleSpell('prestidigitation');
      }}style={stylesContainer.pc3}>
        <Text style={stylesContainer.textoPC2}>Prestidigitation</Text>
      </Pressable>
      <Text style={{fontSize:25, margin:5}}>Nivel 1</Text>
      <Pressable id='burning-hands' onPress={() => {
        handleSpell('burning-hands');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Burning Hands</Text>
      </Pressable>
      <Pressable id='charm-person' onPress={() => {
        handleSpell('charm-person');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Charm Person</Text>
      </Pressable>
      <Pressable id='command' onPress={() => {
        handleSpell('command');
      }}style={stylesContainer.pc3}>
        <Text style={stylesContainer.textoPC}>Command</Text>
      </Pressable>
      <Pressable id='guiding-bolt' onPress={() => {
        handleSpell('guiding-bolt');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Guiding Bolt</Text>
      </Pressable>
      <Text style={{fontSize:25, margin:5}}>Nivel 2</Text>
      <Pressable id='detect-thoughts' onPress={() => {
        handleSpell('detect-thoughts');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Detect Thoughts</Text>
      </Pressable>
      <Pressable id='hold-person' onPress={() => {
        handleSpell('hold-person');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Hold Person</Text>
      </Pressable>
      <Pressable id='invisibility' onPress={() => {
        handleSpell('invisibility');
      }}style={stylesContainer.pc3}>
        <Text style={stylesContainer.textoPC}>Invisibility</Text>
      </Pressable>
      <Pressable id='silence' onPress={() => {
        handleSpell('silence');
      }}style={stylesContainer.pc3}>
        <Text style={stylesContainer.textoPC}>Silence</Text>
      </Pressable>
      <Text style={{fontSize:25, margin:5}}>Nivel 3</Text>
      <Pressable id='dispel-magic' onPress={() => {
        handleSpell('dispel-magic');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Dispel Magic</Text>
      </Pressable>
      <Pressable id='fireball' onPress={() => {
        handleSpell('fireball');
      }}style={stylesContainer.pc4}>
        <Text style={stylesContainer.textoPC}>Fireball</Text>
      </Pressable>
    </View>
    </ScrollView>
  );
}
const OpcionesPCStack = createNativeStackNavigator();

function OpcionesPCStackScreen(){
  return(
    <OpcionesPCStack.Navigator  screenOptions={{headerStyle: {
      backgroundColor: '#b72742',
    }, headerTitleStyle:{
      color:'#fff'
    },  
    headerTitleAlign:'center'}} >
      <OpcionesPCStack.Screen name=" Opciones PC " component={OpcionesPCScreen} />
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
      <Text style={{fontSize:50, color:"#F92452"}}>Proximamente Personajes!</Text>
    </View>
  );
}

function BestiarioScreen() {
 
  
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textoClase, settextoClase] = React.useState("Cargando, Espere un momento.");
  const [selectedId, setSelectedId] = React.useState(null);
  let arrActu = []
  const handleEnemy = (id) => {
    setSelectedId(id); // Reemplaza el ID anterior con el actual
    setModalVisible(true);
  };
  React.useEffect(() => {
    if (modalVisible) {
      const fetchDataEnemy = async () => {
        arrActu = await buscarEnemy(selectedId)
        settextoClase(arrActu);
        
      };
      arrActu = []
      settextoClase("Cargando, Espera un momento.")
      fetchDataEnemy();
      
    }
  }, [modalVisible]);
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:20, marginTop:20}}>Bestiario!</Text>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}>
         <ScrollView>
           <View  style={stodal.modalView}>
             <Text style={stodal.modalText}>{textoClase}</Text>
          <Pressable onPress={() => {
            setModalVisible(!modalVisible);
          }}>
            <Text>Cerrar</Text>
          </Pressable>
        </View>
        </ScrollView>
      </Modal>

      
      <Pressable id='Acolyte' onPress={() => {
        handleEnemy('Acolyte');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Acolito</Text>
      </Pressable>
      <Pressable id='Goblin' onPress={() => {
        handleEnemy('Goblin');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Goblin</Text>
      </Pressable>
      <Pressable id='Troll' onPress={() => {
        handleEnemy('Troll');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Troll</Text>
      </Pressable>
      <Pressable id='Skeleton' onPress={() => {
        handleEnemy('Skeleton');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Esqueleto</Text>
      </Pressable>
      <Pressable id='Earth Elemental' onPress={() => {
        handleEnemy('Earth Elemental');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC}>Elemental de Tierra</Text>
      </Pressable>
      <Pressable id='Adult Red Dragon' onPress={() => {
        handleEnemy('Adult Red Dragon');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC3}>Dragon Rojo Adulto</Text>
      </Pressable>
      <Pressable id='Mimic' onPress={() => {
        handleEnemy('Mimic');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Mimico</Text>
      </Pressable>
      <Pressable id='Owlbear' onPress={() => {
        handleEnemy('Owlbear');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC}>Oso Lechuza</Text>
      </Pressable>
      <Pressable id='Animated Armor' onPress={() => {
        handleEnemy('Animated Armor');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC}>Armadura Animada</Text>
      </Pressable>
    </View>
  );
}

const BestiarioStack = createNativeStackNavigator();

function BestiarioStackScreen(){
  return(
    <OpcionesPCStack.Navigator  screenOptions={{headerStyle: {
      backgroundColor: '#b72742',
    }, headerTitleStyle:{
      color:'#fff'
    },  
    headerTitleAlign:'center'}} >
      <OpcionesPCStack.Screen name=" Bestiario " component={BestiarioScreen} />
      
    </OpcionesPCStack.Navigator>
  );
}
function ReferenciasScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{width:'100%', height: '20%'}}>
      <Pressable onPress={()=>navigation.navigate('Combate')}  style={stylesContainer.boton }><Text style={stylesContainer.texto }>
      <Image style={imagen.tinyLogo} source={require('./iconos/espada.png')}/>Combate</Text></Pressable>{/* espada */}
      </View>

      <View style={{width:'100%', height: '20%'}}>
      <Pressable onPress={()=>navigation.navigate('Equipamiento')}  style={stylesContainer.boton }><Text style={stylesContainer.texto }>
      <Image style={imagen.tinyLogo} source={require('./iconos/equipo.png')}/>Equipamiento</Text></Pressable>{/* destello */}
      </View>

      <View style={{width:'100%', height: '20%'}}>
      <Pressable onPress={()=>navigation.navigate('Reglas de DM')}  style={stylesContainer.boton }><Text style={stylesContainer.texto }>
      <Image style={imagen.tinyLogo} source={require('./iconos/dm.png')}/>Reglas de DM</Text></Pressable>{/* espada */}
      </View>

      <View style={{width:'100%', height: '20%'}}>
      <Pressable onPress={()=>navigation.navigate('Mecanicas de Juego')}  style={stylesContainer.boton }><Text style={stylesContainer.texto }>
      <Image style={imagen.tinyLogo} source={require('./iconos/mecanicas.png')}/>Mecanicas de Juego</Text></Pressable>{/* espada */}
      </View>

      <View style={{width:'100%', height: '15%'}}>
      <Pressable onPress={()=>navigation.navigate('Creditos')}  style={stylesContainer.boton2 }><Text style={stylesContainer.texto2 }>
      <Image style={imagen.tinyLogo} source={require('./iconos/montana.png')}/>Creditos</Text></Pressable>{/* espada */}
      </View>

    </View>
  );
}

function CombateScreen() {
  
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textoClase, settextoClase] = React.useState("Cargando, Espere un momento.");
  const [selectedId, setSelectedId] = React.useState(null);
  let arrActu = []
  const handleCombat = (id) => {
    setSelectedId(id); // Reemplaza el ID anterior con el actual
    setModalVisible(true);
  };
  React.useEffect(() => {
    if (modalVisible) {
      const fetchDataCombat = async () => {
        arrActu = await buscarCombat(selectedId)
        settextoClase(arrActu);
        
      };
      arrActu = []
      settextoClase("Cargando, Espera un momento.")
      fetchDataCombat();
      
    }
  }, [modalVisible]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:20, marginBottom:40}}>Combate!</Text>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}>
         <ScrollView>
           <View  style={stodal.modalView}>
             <Text style={stodal.modalText}>{textoClase}</Text>
          <Pressable onPress={() => {
            setModalVisible(!modalVisible);
          }}>
            <Text>Cerrar</Text>
          </Pressable>
        </View>
        </ScrollView>
      </Modal>
      
      <Pressable id='Spellcasting' onPress={() => {
        handleCombat('Spellcasting');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC3}>Lanzamiento de Hechizos</Text>
      </Pressable>

      <Pressable id='Actions in Combat' onPress={() => {
        handleCombat('Actions in Combat');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC4}>Acciones en Combate</Text>
      </Pressable>
      
      <Pressable id='Attacking' onPress={() => {
        handleCombat('Attacking');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Atacar</Text>
      </Pressable>
      
      <Pressable id='Combat Sequence' onPress={() => {
        handleCombat('Combat Sequence');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC4}>Secuencia de Combate</Text>
      </Pressable>
      
      <Pressable id='Cover' onPress={() => {
        handleCombat('Cover');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Cobertura</Text>
      </Pressable>
      
      <Pressable id='Damage and Healing' onPress={() => {
        handleCombat('Damage and Healing');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC}>Daño y Curacion</Text>
      </Pressable>
      
      <Pressable id='Mounted Combat' onPress={() => {
        handleCombat('Mounted Combat');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC}>Combate Montado</Text>
      </Pressable>
      
      <Pressable id='Underwater Combat' onPress={() => {
        handleCombat('Underwater Combat');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC4}>Combate Bajo el Agua</Text>
      </Pressable>
    </View>
  );
}

function EquipoScreen() {  
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textoClase, settextoClase] = React.useState("Cargando, Espere un momento.");
  const [selectedId, setSelectedId] = React.useState(null);
  let arrActu = []
  const handleCombat = (id) => {
    setSelectedId(id); // Reemplaza el ID anterior con el actual
    setModalVisible(true);
  };
  React.useEffect(() => {
    if (modalVisible) {
      const fetchDataCombat = async () => {
        arrActu = await buscarCombat(selectedId)
        settextoClase(arrActu);
        
      };
      arrActu = []
      settextoClase("Cargando, Espera un momento.")
      fetchDataCombat();
      
    }
  }, [modalVisible]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:20, marginBottom:20}}>Equipamiento!</Text>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}>
         <ScrollView>
           <View  style={stodal.modalView}>
             <Text style={stodal.modalText}>{textoClase}</Text>
          <Pressable onPress={() => {
            setModalVisible(!modalVisible);
          }}>
            <Text>Cerrar</Text>
          </Pressable>
        </View>
        </ScrollView>
      </Modal>
      
      <Pressable id='Adventuring Gear' onPress={() => {
        handleCombat('Adventuring Gear');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC2}>Equipamiento de Aventuras</Text>
      </Pressable>
      
      <Pressable id='Armor' onPress={() => {
        handleCombat('Armor');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Armadura</Text>
      </Pressable>
      
      <Pressable id='Coins' onPress={() => {
        handleCombat('Coins');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Monedas</Text>
      </Pressable>
      
      <Pressable id='Equipment Packs' onPress={() => {
        handleCombat('Equipment Packs');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC2}>Paquetes de Equipamiento</Text>
      </Pressable>
      
      <Pressable id='Expenses' onPress={() => {
        handleCombat('Expenses');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Expensas</Text>
      </Pressable>
      
      <Pressable id='Mounts and Vehicles' onPress={() => {
        handleCombat('Mounts and Vehicles');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC5}>Monturas y Vehiculos</Text>
      </Pressable>
      
      <Pressable id='Selling Treasure' onPress={() => {
        handleCombat('Selling Treasure');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC}>Vender Tesoros</Text>
      </Pressable>
      
      <Pressable id='Tools' onPress={() => {
        handleCombat('Tools');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC2}>Herramientas</Text>
      </Pressable>
      
      <Pressable id='Trade Goods' onPress={() => {
        handleCombat('Trade Goods');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC}>Bienes de Comercio</Text>
      </Pressable>
      
      <Pressable id='Weapons' onPress={() => {
        handleCombat('Weapons');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Armas</Text>
      </Pressable>
      </View>
  );
}

function ReglasDMScreen() {

  const [modalVisible, setModalVisible] = React.useState(false);
  const [textoClase, settextoClase] = React.useState("Cargando, Espere un momento.");
  const [selectedId, setSelectedId] = React.useState(null);
  let arrActu = []
  const handleCombat = (id) => {
    setSelectedId(id); // Reemplaza el ID anterior con el actual
    setModalVisible(true);
  };
  React.useEffect(() => {
    if (modalVisible) {
      const fetchDataCombat = async () => {
        arrActu = await buscarCombat(selectedId)
        settextoClase(arrActu);
        
      };
      arrActu = []
      settextoClase("Cargando, Espera un momento.")
      fetchDataCombat();
      
    }
  }, [modalVisible]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:20, marginBottom:20}}>Reglas de DM!</Text>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}>
         <ScrollView>
           <View  style={stodal.modalView}>
             <Text style={stodal.modalText}>{textoClase}</Text>
          <Pressable onPress={() => {
            setModalVisible(!modalVisible);
          }}>
            <Text>Cerrar</Text>
          </Pressable>
        </View>
        </ScrollView>
      </Modal>
      
      <Pressable id='Conditions' onPress={() => {
        handleCombat('Conditions');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC5}>Condiciones</Text>
      </Pressable>
      
      <Pressable id='Diseases' onPress={() => {
        handleCombat('Diseases');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC2}>Enfermedades</Text>
      </Pressable>
      
      <Pressable id='Madness' onPress={() => {
        handleCombat('Madness');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Locura</Text>
      </Pressable>
      
      <Pressable id='Magic Items' onPress={() => {
        handleCombat('Magic Items');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC}>Objetos Magicos</Text>
      </Pressable>
      
      <Pressable id='Monsters' onPress={() => {
        handleCombat('Monsters');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Monstruos</Text>
      </Pressable>
      
      <Pressable id='Nonplayer Characters' onPress={() => {
        handleCombat('Nonplayer Characters');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC6}> Personajes No Jugadores</Text>
      </Pressable>
      
      <Pressable id='Objects' onPress={() => {
        handleCombat('Objects');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Objetos</Text>
      </Pressable>
      
      <Pressable id='Pantheons' onPress={() => {
        handleCombat('Pantheons');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Panteon</Text>
      </Pressable>
      
      <Pressable id='Planes' onPress={() => {
        handleCombat('Planes');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Planos</Text>
      </Pressable>
      
      <Pressable id='Poisons' onPress={() => {
        handleCombat('Poisons');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Venenos</Text>
      </Pressable>

      <Pressable id='Traps' onPress={() => {
        handleCombat('Traps');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Trampas</Text>
      </Pressable>
      </View>
  );
}


function MecanicasScreen() {
 
  
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textoClase, settextoClase] = React.useState("Cargando, Espere un momento.");
  const [selectedId, setSelectedId] = React.useState(null);
  let arrActu = []
  const handleCombat = (id) => {
    setSelectedId(id); // Reemplaza el ID anterior con el actual
    setModalVisible(true);
  };
  React.useEffect(() => {
    if (modalVisible) {
      const fetchDataCombat = async () => {
        arrActu = await buscarCombat(selectedId)
        settextoClase(arrActu);
        
      };
      arrActu = []
      settextoClase("Cargando, Espera un momento.")
      fetchDataCombat();
      
    }
  }, [modalVisible]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:20, marginBottom:40}}>Mecanicas de Juego!</Text>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}>
         <ScrollView>
           <View  style={stodal.modalView}>
             <Text style={stodal.modalText}>{textoClase}</Text>
          <Pressable onPress={() => {
            setModalVisible(!modalVisible);
          }}>
            <Text>Cerrar</Text>
          </Pressable>
        </View>
        </ScrollView>
      </Modal>
      
      <Pressable id='Abilities' onPress={() => {
        handleCombat('Abilities');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC5}>Habilidades</Text>
      </Pressable>

      <Pressable id='Between Adventures' onPress={() => {
        handleCombat('Between Adventures');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC}>Entre Aventuras</Text>
      </Pressable>
      
      <Pressable id='Enviroment' onPress={() => {
        handleCombat('Enviroment');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Entorno</Text>
      </Pressable>
      
      <Pressable id='Movement' onPress={() => {
        handleCombat('Movement');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC4}>Movimiento</Text>
      </Pressable>
      
      <Pressable id='Rest' onPress={() => {
        handleCombat('Rest');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Descanso</Text>
      </Pressable>
      
      <Pressable id='Saving Throws' onPress={() => {
        handleCombat('Saving Throws');
      }}style={stylesContainer.pc2}>
        <Text style={stylesContainer.textoPC}>Tiradas de Salvacion</Text>
      </Pressable>
      
      <Pressable id='Time' onPress={() => {
        handleCombat('Time');
      }}style={stylesContainer.pc}>
        <Text style={stylesContainer.textoPC}>Tiempo</Text>
      </Pressable>
      
    </View>
  );
}


function CreditosScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:50, marginBottom:40}}>Creditos</Text>
      <Text style={{fontSize:30, marginBottom:40, color:"#B75454"}}> Ares Ignacio </Text>
      <Text style={{fontSize:30, marginBottom:40, color:"#B75454"}}> Venturin Nicolas </Text>
      </View>
  );
}

const ReferenciasStack = createNativeStackNavigator();

function ReferenciasStackScreen(){
  return(
    <ReferenciasStack.Navigator screenOptions={{headerStyle: {
      backgroundColor: '#b72742',
    }, headerTitleStyle:{
      color:'#fff'
    },
    headerTitleAlign:'center'}} >
      <ReferenciasStack.Screen name=" Referencias " component={ReferenciasScreen}/>
      <ReferenciasStack.Screen name="Combate" component={CombateScreen}/>
      <ReferenciasStack.Screen name="Equipamiento" component={EquipoScreen}/>
      <ReferenciasStack.Screen name="Reglas de DM" component={ReglasDMScreen}/>
      <ReferenciasStack.Screen name="Mecanicas de Juego" component={MecanicasScreen}/>
      <ReferenciasStack.Screen name="Creditos" component={CreditosScreen}/>
    </ReferenciasStack.Navigator>
  )
}
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route  }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Opciones PC') {
              iconName = focused
                ? 'accessibility-outline'
                : 'accessibility-outline';
            } else if (route.name === 'Personajes') {
              iconName = focused ? 'people-outline' : 'people-outline';
            }
              else if(route.name === 'Bestiario'){
                iconName = focused ? 'book-outline' : 'book-outline';
              }
              else if(route.name === 'Referencias'){
                iconName = focused ? 'bookmarks-outline' : 'bookmarks-outline';
              }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          
          
          
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray', })}
          >
            
        
        <Tab.Screen name="Opciones PC" component={OpcionesPCStackScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Personajes" component={PersonajesScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Bestiario" component={BestiarioStackScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Referencias" component={ReferenciasStackScreen} options={{headerShown:false}}/>


      </Tab.Navigator>
    </NavigationContainer>
  );
  //?/:/
}
const stylesContainer = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#b72742',
  },
  pc:{
    width: '25%',
    height: '5%',
    margin: '2%',
    borderColor:'#000',
    borderWidth: 4,
    borderRadius:6,
    backgroundColor:'#b75454',
  },
  textoPC:{ 
    color:'#fff',
    textAlign:'center',
    justifyContent:'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoPC2:{ 
    color:'#fff',
    paddingTop:5,
    textAlign:'center',
    justifyContent:'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  textoPC3:{ 
    color:'#fff',
    paddingTop:10,
    textAlign:'center',
    justifyContent:'center',
    fontSize: 13,
    fontWeight: 'bold',
  },
  textoPC4:{ 
    color:'#fff',
    paddingTop:5,
    textAlign:'center',
    justifyContent:'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  textoPC5:{ 
    color:'#fff',
    paddingTop:3,
    textAlign:'center',
    justifyContent:'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  textoPC6:{ 
    color:'#fff',
    paddingTop:5,
    textAlign:'center',
    justifyContent:'center',
    fontSize: 13,
    fontWeight: 'bold',
  },
   pc2:{
    width: '25%',
    height: '8%',
    margin: '2%',
    borderColor:'#000',
    borderWidth: 4,
    borderRadius:6,
    backgroundColor:'#b75454',
  },
  pc3:{
   width: '25%',
   height: '3%',
   margin: '2%',
   borderColor:'#000',
   borderWidth: 4,
   borderRadius:6,
   backgroundColor:'#b75454',
 },  
 pc4:{
  width: '25%',
  marginBottom:70,
  height: '3%',
  margin: '2%',
  borderColor:'#000',
  borderWidth: 4,
  borderRadius:6,
  backgroundColor:'#b75454',
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
    paddingTop:'4.5%',
    color:'#fff',
    textAlign:'center',
    justifyContent:'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  boton2: {
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderColor: '#000',
    borderRadius: 6,
    backgroundColor: '#b75454',
  },
  texto2:{
    paddingTop:'2.3%',
    color:'#fff',
    textAlign:'center',
    justifyContent:'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textos:{
    paddingTop:'4.5%',
    color:'#fff',
    textAlign:'center',
    justifyContent:'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const imagen = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});


const stodal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1, justifyContent: 'center', alignItems: 'center', 
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    borderWidth: 4,
    borderColor: '#b72742',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})