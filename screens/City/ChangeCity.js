
import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, FlatList } from 'react-native'
import ApiService from '../../utils/Endpoints';
import images from '../../utils/Images';
import style from './style';

export default class ChangeCity extends Component {
  constructor() {
    super()
    this.state = {
      city: "",
      getCity: [],
      err: false,
    }
  }
  componentDidMount = async () => {
    // this.getPost()
  }

  getPost = async () => {
    console.log("hhhjhjhjd", this.state.city)
    await fetch(ApiService.getCityUrl + `${this.state.city}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((res) => {
        console.log("getDATA", res)
        if (res.data.Record.length == 0) {
          this.setState({ err: true })
          console.log("ok")
        }
        if (res.status == 200 && res.data.Record.length > 0) {
          this.setState({ err: false, getCity: res.data.Record })
        }
      }).catch((err) => console.log("jhjhhjhj", err))
  }




  render_Image = ({ item, index }) => {
    return (
      <View style={style.fltlistView}>
        <TouchableOpacity onPress={() => this.props.navigation.push("Home", { city: item.name, location: item.coord })}>
          <Text style={{ fontSize: 18, }}>{item.name}</Text>
          <Text style={{ fontSize: 14, }}>{item.country}</Text>
        </TouchableOpacity>
        <View style={{ width: "90%", height: 0.5, backgroundColor: "#000", marginTop: 10 }}></View>
      </View>
    )
  }
  render() {

    return (
      <View style={style.container}>
        <View style={style.mainTxt}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image source={images.backIcon} style={style.img} />
          </TouchableOpacity>
          <Text style={style.cityTxt}>Change City</Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TextInput
            style={style.txtInput}
            value={this.state.city}
            onChangeText={(d) => { this.setState({ city: d, }); this.getPost() }}
          />

        </View>

        {this.state.err == true ?
          <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 18, color: "#000" }}>No data found.</Text>
          </View>
          :
          <FlatList
            // extraData={this.state.getCity}
            style={{ width: "100%", margintop: 10, }}
            data={this.state.getCity}
            renderItem={this.render_Image}
            keyExtractor={(item, index) => index.toString()}
          />}
      </View>
    )
  }
}