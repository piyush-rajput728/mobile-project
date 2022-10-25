
import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, FlatList } from 'react-native'
import ApiService from '../../utils/Endpoints';
import style from './style';
import moment from 'moment'
import images from '../../utils/Images';

const list = [
  { id: "1", icon: require('../../assets/Imgaes/rate.png'), title: "Cloudy" },
  { id: "2", icon: require('../../assets/Imgaes/likeUnfill.png'), title: "Sunny" },
  { id: "3", icon: require('../../assets/Imgaes/likeUnfill.png'), title: "Sunny" },
  { id: "4", icon: require('../../assets/Imgaes/likeUnfill.png'), title: "Sunny" },
  { id: "5", icon: require('../../assets/Imgaes/likeUnfill.png'), title: "Sunny" },
]

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      city: 'Delhi',
      lat: "28.5355",
      lon: "77.3910",
      getCity: [],
      getTemp: "",
    }
  }
  componentDidMount = async () => {
    let data = this.props.route.params
    if (data == null || data == undefined) {
      this.getDAta(this.state.lon, this.state.lat)

    }
    else {
      let data = this.props.route.params
      console.log("hghghgghghgh", data)
      this.setState({ city: data.city, lon: data.location.lon, lat: data.location.lat })
      console.log("hhhjhjhjwwd", this.state.city, this.state.lat, this.state.lon)
      this.getDAta(data.location.lon, data.location.lat)
    }
  }

  getDAta = async (lon, lat) => {
    await fetch(ApiService.baseUrl + `lat=${lat}&lon=${lon}&units=metric&appid=9ae2447983447457a57564703f4382ac&exclude=current,minutely,hourly,alerts`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((res) => {
        console.log("getDATA", res)
        this.setState({ getTemp: res.daily[0].temp.day })
        // if (res.status == 200) {
        //   this.setState({ getCity: res.data.Record })
        // }
      })
  }

  render_Image = ({ item, index }) => {
    console.log("dwffeerfer", item.title)
    return (
      <View style={{ marginHorizontal: 13 }}>
        <Image source={item.icon} style={{ tintColor: "#fff", marginLeft: 5 }} />
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff", marginTop: 5 }}>{item.title}</Text>
      </View>
    )
  }
  render() {
    const dateToFormat = '1976-04-19T12:59-0500'
    return (
      <View style={style.container}>
        <View style={{ flex: 0.2, backgroundColor: "#6BC5AF" }}>
          <Text style={style.cityTxt}>Current Weather</Text>
          <View style={style.txt}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("ChangeCity")}>
              <Text style={style.locationTxt}>{this.state.city}</Text>
            </TouchableOpacity>
            {this.state.getTemp == null && this.state.getTemp == undefined && this.state.getTemp == "" ? null :
              <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff", marginTop: -10 }}>{this.state.getTemp + '\u00b0'}</Text>
            }          
              <View style={style.calView}>
              <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
                <Text style={{ fontSize: 18, fontWeight: "600", color: "#000" }}> {moment().format('DD')}</Text>
                <Image source={images.rate} />
              </View>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#000" }}> {moment().format('ddd,yyyy')}</Text>
            </View>
          </View>

          <FlatList
            // extraData={this.state.getCity}
            horizontal={true}
            style={{ width: "100%", flexGrow: 0, marginTop: 10, }}
            data={list}
            renderItem={this.render_Image}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    )
  }
}