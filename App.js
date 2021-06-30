import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native"

const Dev_Height = Dimensions.get("window").height
const Dev_Width = Dimensions.get("window").width

import Icon from "react-native-vector-icons/AntDesign"

export default class App extends React.Component{
  constructor(props){
    super(props);
      this.state ={
        data: [],
        isLoading: true,
        temp:"",
        city:"Nellore",
        icon:"",
        city_display:"",
        desc: "",
        main:"",
        humidity:"",
        pressure:"",
        visiblity:"",
    }
    this.fetch_weather()
  }

  fetch_weather=()=> {
   fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.state.city+'&appid=2b9bec50f143c3f712133fe6f650aeab')  
 
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
        this.setState({ temp : (json.main.temp-273.15).toFixed(2)+" °C" })
        this.setState({ city_display : json.name })
        this.setState({ icon: json.weather[0].icon})
        this.setState({ desc : json.weather[0].description+".."})
        this.setState({ main : json.weather[0].main})
        this.setState({ humidity : json.main.humidity+" %"})
        this.setState({ pressure : json.main.pressure+" hPa"})
        this.setState({ visibility : (json.visibility/1000).toFixed(2)+" Km"})
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }


  render(){
    return(
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="#FFF"/>
      <ImageBackground source={{uri:"https://i.pinimg.com/564x/c7/3c/81/c73c81116cc7d139d5298c1ddc6b2394.jpg"}} 
      style={styles.Image_Background_Style}>

        <View style={styles.Search_Box_View}>
          <TextInput placeholder="Search" placeholderTextColor="#FFF" style={styles.Search_Box} onChangeText={(text)=>this.setState({city : text})} />
            <TouchableOpacity style={styles.button_touch} onPress={this.fetch_weather}>
              <Icon name="search1" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

        <View style={styles.Weather_Box_Main}>
          <View style={styles.Weather_Holder_View}>
              <Image tintColor='#FFFDFA' source={{uri:"http://openweathermap.org/img/wn/"+this.state.icon+"@2x.png",}} style={styles.Weather_Image}/>
              <View>
                <Text style={styles.temprature_text}>{this.state.temp}</Text>
                <Text style={styles.city_text}>{this.state.city_display}</Text>
              </View>
            </View>
        </View>

        <View style={styles.Info_Box_View}>
          <View style={styles.Info_Holder_Veiw}>
            <Text style={styles.Main_Weather_Text}>{this.state.main}</Text>
            <Text style={styles.description_text}>{this.state.desc}</Text>
            <Text style={styles.humidity_text}>Humidity : {this.state.humidity}</Text>
            <Text style={styles.other_text}>Pressure : {this.state.pressure}</Text>
            <Text style={styles.other_text}>Visibility : {this.state.visibility}</Text>
          </View>
        </View>
      </ImageBackground>
      
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    height:Dev_Height,
    width: Dev_Width
  },
  Image_Background_Style:{
    height:"100%",
    width:"100%"
  },
  Search_Box_View:{
    height:"20%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    fontWeight:"bold"
  },
  Search_Box:{
    height:"35%",
    width:"80%",
    borderColor:"#FFF",
    borderWidth:1,
    borderRadius:100,
    color:"#FFF",
    paddingHorizontal:15,
    fontWeight:"bold"
  },
  button_touch:{
    marginLeft:"5%",
    height:"35%",
    width:"8%",
    justifyContent:"center",
    alignItems:"center"
  },
  Weather_Box_Main:{
    height:"30%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  Weather_Holder_View:{
    height:"80%",
    width:"90%",
    backgroundColor:'rgba(186, 205, 250,0.3)',
    borderRadius:15,
    alignItems:"center",
    flexDirection:"row"
  },
  Weather_Image:{
    height:"80%",
    width:"50%"
  },
  temprature_text:{
    fontSize:35,
    color:"#FFF",
    marginLeft:"3%",
    fontWeight:'bold'
  },
  city_text:{
    fontSize:25,
    color:"#FFF",
    marginLeft:"5%",
    marginTop:"3%",
    fontWeight:'bold'
  },
  Info_Box_View:{
    height:"45%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  Info_Holder_Veiw:{
    height:"80%",
    width:"90%",
    backgroundColor: 'rgba(186, 205, 250,0.5)',
    borderRadius:20
  },
  Main_Weather_Text:{
    fontSize:55,
    color:"#FFF",
    marginLeft:"5%",
    marginTop:"8%",
    fontWeight:"bold",
    textTransform:"uppercase",
  },
  description_text:{
    fontSize:25,
    color: '#FFF',
    marginLeft:"8%",
    marginTop:"1%",
    textTransform: 'capitalize',
    fontWeight:'bold'
  },
  humidity_text:{
    fontSize:20,
    color:"#FFF",
    marginLeft:"8%",
    marginTop:"1%"
  },
  other_text:{
    fontSize:20,
    color:"#FFF",
    marginLeft:"8%",
    marginTop:"1%"
  }
})
