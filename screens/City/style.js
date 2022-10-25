import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#CEF8F2"
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
        fontSize: 22, marginLeft: 20, fontWeight: "bold"
    },
    styleTxt: {
        fontSize: 22, marginTop: 20, marginLeft: 20, fontWeight: "bold"
    },
    txtInput: {
        height: 50, width: 350, borderRadius: 5,
        borderWidth: 1.5, paddingLeft: 10, borderColor: "#1FC7F8", backgroundColor: "#fff"
    },
    fltlistView: {
        marginVertical: 10, justifyContent: "center", marginLeft: 20
    },
})
export default style;