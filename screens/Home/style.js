import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff"
    },
    mainTxt: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        marginTop: 20,
    },
    img: {
        tintColor: "#000",
        width: 17, height: 17
    },
    cityTxt: {
        fontSize: 22, marginLeft: 20, fontWeight: "bold", color: "#fff", marginTop: 10
    },
    txt: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        marginHorizontal: 20
        // marginLeft:20
    },
    locationTxt: {
        fontSize: 18, fontWeight: "600", color: "#fff"

    },
    thirdTxt: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        marginHorizontal: 20,
        width: "65%"
    },
    calView:{
        backgroundColor:"#fff",justifyContent:"center",alignItems:"center",
        width:60,height:50,borderRadius:10,marginTop:-20
    }
})
export default style;