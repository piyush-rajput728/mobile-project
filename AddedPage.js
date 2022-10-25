import React from 'react';

import { View, Text, Switch, StyleSheet, StatusBar, ActivityIndicator, Image, ScrollView, TouchableOpacity, TextInput, Alert, AsyncStorage, FlatList } from 'react-native';
import Style from './Style';
import Modal from 'react-native-modal';
import { scale, verticalScale, vh } from './Scale';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import ApiService from '../api/ApiService';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { ButtonGroup } from 'react-native-elements';


const title = 'Select Tab';
const options = [
    'Cancel',
    'Camera',
    'Gallery',
]
const CANCEL_INDEX = 0;
export default class AddedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            billingModal: false,
            secondrenewValue: 0,
            editBillingModal: false,
            editAnnualText: '',
            option_Level: [],
            dropDownValueL: "",
            editMonthlyText: '',
            editMonthlyTextvalidate: false,
            editAnnualTextvalidate: false,
            editNotificationText: '',
            editNotificationTextvalidate: false,
            editEmailNoti: '',
            editDemailNotivalidate: false,
            renewalModal: false,
            renewalTwoModal: false,
            createMembershipModal: false,
            memberName: '',
            description: '',
            subsText: '',
            email: '',
            isfreeenabled: false,
            ispastenabled: false,
            priceText: '',
            notificationText: '',
            emailNoti: '',
            welcomeEmail: '',
            planText: '',
            totaldescription: '',
            paymentpage: '',
            image: '',
            selectIndex: 1,
            profileDummy: '',
            profile_pic: '',
            profile_pic1: '',
            profile_picData: null,
            profile_picData1: null,
            subscriptionType: '',
            amount: '',
            storedSubType: '',
            subscriptionModal: false,
            listItem: '',
            monthlyText: '',
            annualText: '',
            secondrenew: '',
            seconddescription: '',
            checkcondition: false,
            checkcondition1: false,
            showLoader: false,
            memberNamevalidate: false,
            descriptionvalidate: false,
            subsTextvalidate: false,
            notificationTextvalidate: false,
            demailNotivalidate: false,
            monthlyTextvalidate: false,
            annualTextvalidate: false,
            toggleError: false,
            checkValue: false,
            planTextValidate: false,
            descValidate: false,
            renewValidate: false,
            descriptionValidate: false,
            tabView1: 0,
            tabView: 2,
            tabCheck: false,
            notificationEmailValidate: false,
            closemodal: false,
            checkcondition100: false,
            checkBackValue: false,
            newCheck: false,
            editCreateMembershipModal: false,
            editCreate: false,
            newCheckValue: false,
            editMemberName: '',
            ediDescription: '',
            editImage: '',
            editSubsText: '',
            isEditFreeenabled: false,
            isEditpastenabled: false,
            editMemberNamevalidate: false,
            editDescriptionvalidate: false,
            editSubsTextvalidate: false,
            editToggleError: false,
            editCheckCondition: false,
            editCheckcondition1: false,
            editCheckBackValue: false,
            editRenewalTwoModal: false,
            editCheckcondition100: false,
            editPlanText: '',
            editPlanTextValidate: false,
            editTotaldescription: '',
            editDescValidate: false,
            editSecondrenew: '',
            editRenewValidate: false,
            editSeconddescription: '',
            editdescriptionValidate: false,
            editNewCheck: false,
            editCheckValue: false,
            storeSubsType: '',
            checkSubType: false,
            storeSubsID: '',
            imageValue: false,
            subsValue: false,
            subsValue1: false,
            copiedText: '',
            valueStore: '',



        }
    }

    onFocusFunction = () => {
        this.membershipFunction();

    }



    async componentDidMount() {
        // this.membershipFunction();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.membershipFunction();
            this.onFocusFunction()
        })

    }

    getMemberShipDetails = async (id) => {
        var AcceptToken = await AsyncStorage.getItem('access_token');
        // alert("ok")
        fetch(
            ApiService.BASE_URL +
            `subs/${id}`,
            {
                method: "GET",
                headers: {
                    'Accept': "application/json",
                    "Content-Type": "application/json",
                    Authorization: AcceptToken
                },
            }
        )
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    storeData: responseData?.result?.validSubs,
                    editMemberName: responseData?.result?.validSubs?.tier,
                    ediDescription: responseData?.result?.validSubs?.description,
                    editImage: responseData?.result?.validSubs?.thumbnailImg,
                    editSubsText: responseData?.result?.validSubs?.signUpBtnText,
                    storeSubsType: responseData?.result?.validSubs?.substype,
                    isEditFreeenabled: responseData?.result?.validSubs?.substype == "Free" ? true : false,
                    isEditpastenabled: responseData?.result?.validSubs?.substype == "Paid" ? true : false,
                    editMonthlyText: responseData?.result?.validSubs?.amountMonthly,
                    editAnnualText: responseData?.result?.validSubs?.amountYearly,
                    editNotificationText: responseData?.result?.validSubs?.emailId,
                    editEmailNoti: responseData?.result?.validSubs?.emailContent,
                    editPlanText: responseData?.result?.validSubs?.successMessageSubject,
                    editTotaldescription: responseData?.result?.validSubs?.successMessageDescription,
                    editSecondrenew: responseData?.result?.validSubs?.renewalReminderSubject,
                    editSeconddescription: responseData?.result?.validSubs?.renewalReminderDescription,
                    createMembershipModal: false
                    // editCreate: true, subscriptionModal: false,
                });

                this.againUpdateState(responseData)
            })
            .catch((err) => console.log("Errorr is--- ", err));
    };

    againUpdateState = responseData => {
        this.setState({
            storeData: responseData?.result?.validSubs,
            editMemberName: responseData?.result?.validSubs?.tier,
            ediDescription: responseData?.result?.validSubs?.description,
            editImage: responseData?.result?.validSubs?.thumbnailImg,
            editSubsText: responseData?.result?.validSubs?.signUpBtnText,
            storeSubsType: responseData?.result?.validSubs?.substype,
            isEditFreeenabled: responseData?.result?.validSubs?.substype == "Free" ? true : false,
            isEditpastenabled: responseData?.result?.validSubs?.substype == "Paid" ? true : false,
            editMonthlyText: responseData?.result?.validSubs?.amountMonthly,
            editAnnualText: responseData?.result?.validSubs?.amountYearly,
            editNotificationText: responseData?.result?.validSubs?.emailId,
            editEmailNoti: responseData?.result?.validSubs?.emailContent,
            editPlanText: responseData?.result?.validSubs?.successMessageSubject,
            editTotaldescription: responseData?.result?.validSubs?.successMessageDescription,
            editSecondrenew: responseData?.result?.validSubs?.renewalReminderSubject,
            editSeconddescription: responseData?.result?.validSubs?.renewalReminderDescription,
            editCreate: true, subscriptionModal: false, createMembershipModal: false, newCheckValue: false, checkBackValue: false
        });
    }

    membershipFunction = async () => {
        var AccessToken = await AsyncStorage.getItem('access_token')
        var refId = await AsyncStorage.getItem('id');
        fetch(ApiService.BASE_URL + `subs/subAdminId/${refId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: AccessToken
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.status === 200) {
                    this.setState({ listItem: responseData, subscriptionModal: true })
                    let level = []
                    for (i = 0; i <= responseData.result.length; i++) {
                        level.push(i)
                    }
                    // option = { level }
                    this.setState({ option_Level: level, subscriptionModal: true })
                }


                else if (responseData.status == 201) {
                    this.setState({ createMembershipModal: true })
                }

            }).catch((err) => console.log('login Errorr is--- ', err))
            .done();

        fetch(ApiService.BASE_URL + 'substype', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })

            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ subscriptionType: responseData.result })
            }).catch((err) => console.log('login Errorr is--- ', err))
            .done();
    }

    checkFirst = () => {
        if (this.state.memberName.trim() === "") {
            this.setState({ memberNamevalidate: true })
        }

        else if (this.state.description.trim() === "") {
            this.setState({ descriptionvalidate: true })
        }


        else if (this.state.subsText.trim() === "") {
            this.setState({ subsTextvalidate: true })
        }

        else if (this.state.isfreeenabled == false && this.state.ispastenabled === false) {
            this.setState({ toggleError: true })
        }

        else {
            this.setState({ createMembershipModal: false, checkcondition: true })
        }

    }

    editCheckFirst = () => {
        if (this.state.editMemberName.trim() === "") {
            this.setState({ editMemberNamevalidate: true })
        }

        else if (this.state.ediDescription.trim() === "") {
            this.setState({ editDescriptionvalidate: true })
        }


        else if (this.state.editSubsText.trim() === "") {
            this.setState({ editSubsTextvalidate: true })
        }

        else if (this.state.isEditFreeenabled == false && this.state.isEditpastenabled === false) {
            this.setState({ editToggleError: true })
        }

        else {
            this.setState({ editCreateMembershipModal: false, editCheckCondition: true })
        }

    }

    checkSecond = () => {

        if (this.state.monthlyText.trim() === "") {
            this.setState({ monthlyTextvalidate: true })
        }

        else if (this.state.annualText.trim() === "") {
            this.setState({ annualTextvalidate: true })
        }

        else if (this.state.notificationText.trim() === "") {
            this.setState({ notificationTextvalidate: true })
        }

        else if (this.state.emailNoti.trim() === "") {
            this.setState({ demailNotivalidate: true })
        }

        else {
            this.setState({ billingModal: false, checkcondition1: true })
        }

    }
    editCheckSecond = () => {

        // if (this.state.editMonthlyText.trim() === "") {
        //     this.setState({ editMonthlyTextvalidate: true })
        // }

        // else if (this.state.editAnnualText.trim() === "") {
        //     this.setState({ editAnnualTextvalidate: true })
        // }

        if (this.state.editNotificationText.trim() === "") {
            this.setState({ editNotificationTextvalidate: true })
        }

        else if (this.state.editEmailNoti.trim() === "") {
            this.setState({ editDemailNotivalidate: true })
        }

        else {
            this.setState({ editBillingModal: false, editCheckcondition1: true })
        }

    }
    checkSecondMore = () => {
        if (this.state.notificationText.trim() === "") {
            this.setState({ notificationTextvalidate: true })
            this.setState({ notificationEmailValidate: true })

        }

        else if (this.state.emailNoti.trim() === "") {
            this.setState({ demailNotivalidate: true })
        }
        else {
            this.setState({ billingModal: false, checkcondition1: true })
        }

    }

    editCheckSecondMore = () => {
        if (this.state.editNotificationText.trim() === "") {
            this.setState({ editNotificationTextvalidate: true })
            this.setState({ editNotificationTextvalidate: true })

        }

        else if (this.state.editEmailNoti.trim() === "") {
            this.setState({ editDemailNotivalidate: true })
        }
        else {
            this.setState({ editBillingModal: false, editCheckcondition1: true })
        }

    }

    handleEmail = (inputText) => {
        this.setState({ notificationText: inputText, notificationTextvalidate: false, })
        var mailformat = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (mailformat.test(this.state.notificationText)) {
            this.setState({ notificationEmailValidate: true });
            //  this.verifyMail();
        }
        this.setState({ notificationEmailValidate: false });

    }
    editHandleEmail = (inputText) => {
        this.setState({ editNotificationText: inputText, editNotificationTextvalidate: false, })
        var mailformat = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (mailformat.test(this.state.editNotificationText)) {
            this.setState({ editNotificationTextvalidate: true });
            //  this.verifyMail();
        }
        this.setState({ editNotificationTextvalidate: false });

    }

    createSubs = async () => {
        // this.setState({secondrenewValue: +1 })
        if (this.state.planText.trim() === "") {
            this.setState({ planTextValidate: true })
        }

        else if (this.state.totaldescription.trim() === "") {
            this.setState({ descValidate: true })
        }


        // else if (this.state.planText.trim() != "" && this.state.totaldescription.trim() != "") {
        //     this.setState({ tabView1: 1 })
        // }

        else if (this.state.secondrenew.trim() === "") {
            this.setState({ renewValidate: true, tabView1: 1, })
        }
        // else if (this.state.secondrenew.trim() === "") {
        //     this.setState({ renewValidate: true, })
        // }
        else if (this.state.seconddescription.trim() === "") {
            this.setState({ descriptionValidate: true })
        }

        else {
            this.setState({ showLoader: true })
            var stored = '';
            if (this.state.isfreeenabled) {
                stored = 'Free'
            }
            else {
                stored = 'Paid'
            }
            this.setState({ billingModal: false });
            var refId = await AsyncStorage.getItem('id');
            var AccessToken = await AsyncStorage.getItem('access_token');
            var proimageObj = {
                name: this.state.profile_picData && this.state.profile_picData.name,
                type: this.state.profile_picData && this.state.profile_picData.type,
                uri: this.state.profile_picData && this.state.profile_picData.profile_pic,
            }
            var formdata = new FormData();
            formdata.append(`name`, new Date().toISOString());
            formdata.append(`description`, this.state.description);
            formdata.append(`subAdminId`, refId);
            formdata.append(`tier`, this.state.memberName);
            // formdata.append(`tierLevel`, this.state.dropDownValue);
            formdata.append(`thumbnailImg`, this.state.profile_picData === null ? '' : proimageObj);
            formdata.append(`signUpBtnText`, this.state.subsText);
            formdata.append(`substype`, stored);
            formdata.append(`emailId`, this.state.notificationText);
            formdata.append(`emailContent`, this.state.emailNoti);

            if (stored === 'Paid') {
                formdata.append(`amountOneTime`, this.state.priceText === '' ? '' : '');
                formdata.append(`amountMonthly`, this.state.monthlyText === '' ? '' : parseInt(this.state.monthlyText));
                formdata.append(`amountYearly`, this.state.annualText === '' ? '' : parseInt(this.state.annualText));
            }
            else {
                formdata.append(`amountOneTime`, 0);
                formdata.append(`amountMonthly`, 0);
                formdata.append(`amountYearly`, 0);
            }

            formdata.append('successMessageSubject', this.state.planText);
            formdata.append('successMessageDescription', this.state.totaldescription);
            formdata.append('renewalReminderSubject', this.state.secondrenew);
            formdata.append('renewalReminderDescription', this.state.seconddescription);
            fetch(ApiService.BASE_URL + 'subs/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: AccessToken
                },
                body: formdata
            })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData.message === "Subscription Add Successfully") {
                        // alert('Plan Added Successfully!');
                        Alert.alert(
                            '',
                            'Plan Added Successfully!',
                            [
                                { text: 'CANCEL', onPress: () => { return null } },
                                {
                                    text: 'OK', onPress: () => {
                                        // this.membershipFunction();
                                        // this.onFocusFunction();
                                        this.setState({
                                            // subscriptionModal:false,
                                            editCheckCondition: false,
                                            subsValue: false,
                                            showLoader: false,
                                            renewalTwoModal: false,
                                            memberName: '', description: '', image: '', subsText: '',
                                            monthlyText: "", annualText: "", notificationText: "",
                                            emailNoti: "", planText: "", totaldescription: "",
                                            secondrenew: "", seconddescription: "",
                                            ispastenabled: false, isfreeenabled: false,
                                        });
                                        this.membershipFunction()
                                        // this.componentDidMount()
                                    }
                                },
                            ],
                            { cancelable: false }
                        )
                        // this.membershipFunction();
                        // this.setState({ showLoader: false, }}

                        // this.membershipFunction();
                    }

                    if (responseData.status == 400) {
                        this.setState({ showLoader: false, })
                        Alert.alert(
                            "Title",
                            responseData.message != null ? responseData.message : responseData.body.includes('tier') ? `Enter different 'Tier' name! Given tier name already exist` : `Some error occurred, try again!`,
                            [

                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
                    }
                }).catch((err) => console.log('Errorr is--- ', err))
        }
    }

    editCreateSubs = async () => {
        if (this.state.tabView != 3) {
            this.setState({ tabView: 3 })
        }

        else if (this.state.editPlanText.trim() === "") {
            this.setState({ editPlanTextValidate: true })
        }

        else if (this.state.editTotaldescription.trim() === "") {
            this.setState({ editDescValidate: true })
        }

        else if (this.state.editSecondrenew.trim() === "") {
            this.setState({ editRenewValidate: true, tabView: 3 })
        }
        else if (this.state.editSeconddescription.trim() === "") {
            this.setState({ editdescriptionValidate: true })
        }
        else {
            this.setState({ showLoader: true })
            var storedSubType = '';
            if (this.state.isEditFreeenabled) {
                storedSubType = 'Free'
            }
            else {
                storedSubType = 'Paid'
            }
            this.setState({ billingModal: false });
            var refId = await AsyncStorage.getItem('id');
            var AccessToken = await AsyncStorage.getItem('access_token');
            var proimageObj = {
                name: this.state.profile_picData1 && this.state.profile_picData1.name,
                type: this.state.profile_picData1 && this.state.profile_picData1.type,
                uri: this.state.profile_picData1 && this.state.profile_picData1.profile_pic1,
            }
            var formdata = new FormData();
            formdata.append(`name`, this.state.editMemberName);
            formdata.append(`description`, this.state.ediDescription);
            formdata.append(`subAdminId`, refId);
            formdata.append(`tier`, this.state.editMemberName);
            {
                if (this.state.profile_picData1 != null) {
                    formdata.append(`thumbnailImg`, proimageObj);

                }
            }

            // formdata.append(`thumbnailImg`, this.state.profile_picData1 == null ? '' : proimageObj);
            // formdata.append(`thumbnailImg`, this.state.imageValue ? proimageObj : this.state.editImage);
            formdata.append(`signUpBtnText`, this.state.editSubsText);
            formdata.append(`substype`, storedSubType);
            formdata.append(`emailId`, this.state.editNotificationText);
            formdata.append(`emailContent`, this.state.editEmailNoti);

            if (storedSubType === 'Paid') {
                // formdata.append(`amountOneTime`, this.state.priceText === '' ? '' : '');
                formdata.append(`amountMonthly`, this.state.editMonthlyText === '' ? '' : parseInt(this.state.editMonthlyText));
                formdata.append(`amountYearly`, this.state.editAnnualText === '' ? '' : parseInt(this.state.editAnnualText));
            }

            formdata.append('successMessageSubject', this.state.editPlanText);
            formdata.append('successMessageDescription', this.state.editTotaldescription);
            formdata.append('renewalReminderSubject', this.state.editSecondrenew);
            formdata.append('renewalReminderDescription', this.state.editSeconddescription);
            fetch(ApiService.BASE_URL + `subs/${this.state.storeSubsID}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: AccessToken
                },
                body: formdata
            })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData?.result?.message === "Sucessfully Updated Subscription ") {
                        // alert('Plan Updated Successfully!');
                        Alert.alert(
                            '',
                            'Plan Updated Successfully!',
                            [
                                { text: 'CANCEL', onPress: () => { return null } },
                                {
                                    text: 'OK', onPress: () => {
                                        // this.onFocusFunction();
                                        this.setState({
                                            showLoader: false,
                                            // editNewCheck: true,
                                            // subscriptionModal: true,
                                            editRenewalTwoModal: false,
                                            // subscriptionModal: true
                                            // subscriptionModal:false

                                        });
                                        this.membershipFunction()
                                        // this.newFunction()
                                        // this.onFocusFunction();
                                        // this.membershipFunction();

                                    }
                                },
                            ],
                            { cancelable: false }
                        )

                        // this.membershipFunction();
                    }
                    // this.onFocusFunction();
                    // this.membershipFunction();
                    if (responseData.message == "Subscription Creation amount exhausted!") {
                        this.setState({ showLoader: false, })
                        alert('Subscription Creation amount exhausted!')

                    }
                }).catch((err) => console.log('Errorr is--- ', err))

        }




    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    editHandlePress = (buttonIndex) => {
        if (buttonIndex == 1) {
            ImagePicker.openCamera({
                compressImageQuality: 0.8,
                includeBase64: true,
                mediaType: 'photo'
            }).then(image => {
                let imageUrl = Platform.OS == 'ios' ? "file://" + image.path : image.path
                this.setState({ editImage: imageUrl })

                let temp = {
                    profile_pic1: imageUrl,
                    name: image.path.substr(image.path.length - 40),
                    type: image.mime,
                }

                this.setState({ profile_pic1: imageUrl, profile_picData1: temp, imageValue: true })
            }).catch(e => console.log(e));
        }
        if (buttonIndex == 2) {
            ImagePicker.openPicker({
                compressImageQuality: 0.8,
                includeBase64: true,
                includeExif: true,
                mediaType: 'photo'
            }).then(image => {
                let imageUrl = Platform.OS == 'ios' ? "file://" + image.path : image.path
                this.setState({ editImage: imageUrl })

                let temp = {
                    profile_pic1: imageUrl,
                    name: image.path.substr(image.path.length - 40),
                    type: image.mime,
                }

                this.setState({ profile_pic1: imageUrl, profile_picData1: temp, imageValue: true })
            }).catch(e => console.log('Wekgfvdjshv', e));
        }

    }

    handlePress = (buttonIndex) => {
        if (buttonIndex == 1) {
            ImagePicker.openCamera({
                compressImageQuality: 0.8,
                includeBase64: true,
                mediaType: 'photo'
            }).then(image => {
                let imageUrl = Platform.OS == 'ios' ? "file://" + image.path : image.path
                this.setState({ image: imageUrl })

                let temp = {
                    profile_pic: imageUrl,
                    name: image.path.substr(image.path.length - 40),
                    type: image.mime,
                }

                this.setState({ profile_pic: imageUrl, profile_picData: temp })
            }).catch(e => console.log(e));
        }
        if (buttonIndex == 2) {
            ImagePicker.openPicker({
                compressImageQuality: 0.8,
                includeBase64: true,
                includeExif: true,
                mediaType: 'photo'
            }).then(image => {
                let imageUrl = Platform.OS == 'ios' ? "file://" + image.path : image.path
                this.setState({ image: imageUrl })

                let temp = {
                    profile_pic: imageUrl,
                    name: image.path.substr(image.path.length - 40),
                    type: image.mime,
                }

                this.setState({ profile_pic: imageUrl, profile_picData: temp })
            }).catch(e => console.log('Wekgfvdjshv', e));
        }

    }
    render_Item = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                backgroundColor: '#EBF7F6', width: 80, height: 40, borderRadius: 5,
                justifyContent: 'center', alignItems: 'center', marginTop: 10, marginLeft: 15
            }} onPress={() => this.setState({ storedSubType: item._id })}>
                <Text style={{ fontSize: 15, fontWeight: '400', color: '#000000' }}>{item.name}</Text>
            </TouchableOpacity>
        )

    }

    render_ListData = ({ item, index }) => {
        return (
            <ScrollView>
                <View style={{
                    flexDirection: 'row', alignSelf: 'center',
                    width: '94%', marginTop: 15, borderWidth: 1,
                    borderRadius: 10, borderColor: '#00AEB3', marginBottom: 20, height: 160,
                }}>
                    <View style={{ width: 80, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: item.thumbnailImg }} style={{ width: 80, height: 80, marginLeft: 5 }} resizeMode='contain' />
                    </View>
                    <TouchableOpacity style={{ marginLeft: scale(10), position: 'absolute', right: 10, }}
                        onPress={() => {
                            this.setState({
                                // editCreate: true, subscriptionModal: false,
                                storeSubsID: item._id
                            });
                            this.getMemberShipDetails(item._id);
                        }}
                    >
                        <Image source={require('../images/edit.png')} style={{ width: 30, height: 30, marginTop: 10 }} resizeMode='contain' />
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'column', padding: 10, width: 150,
                    }}>
                        <Text style={{ fontWeight: '500', fontSize: 14, color: '#12AEB4', width: 180 }} numberOfLines={2}>{item.tier}</Text>
                        <Text style={{ fontSize: 13, color: '#5A5A5A', marginTop: 5, width: 180, color: '#12AEB4' }} numberOfLines={2}>{item.description}</Text>
                        <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        >
                            <Text style={{ fontSize: 13, color: '#5A5A5A', width: 180, color: '#12AEB4' }} numberOfLines={1} selectable>{item._id}</Text>
                            {/* <Image source={require('../images/edit.png')} style={{ width: 20, height: 20, }} resizeMode='contain' /> */}

                        </TouchableOpacity>

                        <Text style={{ fontSize: 13, color: '#5A5A5A', marginTop: 5, width: 180, }} numberOfLines={1}>{item.emailId}</Text>

                        {
                            item.substype == 'Free' ?
                                <Text style={{ marginTop: 5 }}>Free</Text>
                                :
                                null


                        }
                        {
                            item.substype == 'Paid' && item.amountMonthly != 0 && item.amountYearly != 0 ?

                                <View>
                                    <Text style={{ marginTop: 5 }}>${item.amountMonthly} Monthly</Text>
                                    <Text style={{ marginTop: 5 }}>${item.amountYearly} Yearly</Text>
                                </View>
                                :
                                null

                        }
                        {
                            item.substype == 'Paid' && item.amountMonthly == 0 && item.amountYearly == 0 ?

                                <View>
                                    <Text style={{ marginTop: 5 }}>Free</Text>
                                </View>
                                :
                                null
                        }

                    </View>

                </View>
            </ScrollView>
        )
    }

    hideFunction = () => {
        // this.hide();
        // this.setState({})
        this.categoryRef.hide()
    }
    render() {
        let { subscriptionType } = this.state
        let { listItem } = this.state
        return (
            <ScrollView>
                <View style={Style.container}>
                    <Modal isVisible={this.state.billingModal}
                        onModalHide={() => {
                            this.state.checkcondition1 == true ? this.setState({ renewalTwoModal: true }) : null;
                            this.state.checkBackValue ? this.setState({ billingModal: false, checkBackValue: false, createMembershipModal: true }) : null
                        }}>
                        <ScrollView style={[Style.paymentModalBilling, { maxHeight: "72%" }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 10 }}
                                    onPress={() => { this.setState({ checkBackValue: true, billingModal: false }) }}
                                >
                                    <Image source={require('../images/go.png')} style={{ width: 44, height: 44, }} resizeMode='contain' />
                                    <Text style={Style.folderText}>GO BACK</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: scale(10), position: 'absolute', right: 10, }}
                                    onPress={() => { this.setState({ billingModal: false, checkcondition1: false }); this.props.navigation.goBack() }}>
                                    <Image source={require('../images/videoclose.png')} style={{ width: 42, height: 38, }} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>

                            <Text style={Style.billTxt1}>Billing Options</Text>
                            <Text style={Style.billTxt2}>Tier : {this.state.memberName} | {this.state.isfreeenabled ? 'Free' : 'Paid'}</Text>

                            {
                                this.state.isfreeenabled ?

                                    null :
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <Text style={Style.subBill101}>Monthly*</Text>

                                        <TextInput placeholder="$120"
                                            style={[Style.textViewPrice, {}]}
                                            keyboardType="number-pad"
                                            value={this.state.monthlyText}
                                            onChangeText={(text) => this.setState({ monthlyText: text, monthlyTextvalidate: false })} />

                                        {/* <TextInput placeholder="120$"
                                            style={[Style.textViewPrice, {}]}
                                            keyboardType="number-pad"
                                            value={this.state.monthlyText}
                                            onChangeText={(text) => this.setState({ monthlyText: text, monthlyTextvalidate: false })} /> */}



                                        <Text style={Style.subBill101}>Yearly*</Text>
                                        <TextInput placeholder="$120"
                                            keyboardType="number-pad"
                                            style={[Style.textViewPrice, {}]}
                                            value={this.state.annualText}
                                            onChangeText={(text) => this.setState({ annualText: text, annualTextvalidate: false })} />


                                    </View>

                            }

                            {this.state.monthlyTextvalidate && <View>
                                <Text style={Style.textEmail}>Please Enter the Monthly Amount</Text>
                            </View>}

                            {this.state.annualTextvalidate && <View>
                                <Text style={Style.textEmail}>Please Enter the Yearly Amount</Text>
                            </View>}

                            <Text style={Style.subBill1}>Send Notifications to*</Text>
                            <TextInput placeholder="yourname@companyname"
                                style={[Style.textViewBilling, { paddingLeft: 10, marginTop: 10 }]}
                                value={this.state.notificationText}
                                onChangeText={(text) => this.handleEmail(text)}
                            // onChangeText={(text) => this.setState({ notificationText: text, notificationTextvalidate: false, notificationEmailValidate: false })}
                            />
                            {this.state.notificationTextvalidate && <View>
                                <Text style={Style.textEmail}>Please Enter the notification</Text>
                            </View>}
                            {this.state.notificationEmailValidate && <View>
                                <Text style={Style.textEmail}>Please Enter the Valid Email</Text>
                            </View>}
                            {/* </View> */}
                            <Text style={Style.subBill1}>Content for Email notification*</Text>
                            <TextInput
                                multiline={true}
                                placeholder="Type here..." style={[Style.textViewBilling1, { paddingLeft: 15, marginLeft: 10, alignSelf: 'flex-start' }]}
                                value={this.state.emailNoti}
                                onChangeText={(text) => this.setState({ emailNoti: text, memberValidate: false, demailNotivalidate: false })} />
                            {this.state.demailNotivalidate && <View>
                                <Text style={Style.textEmail}>Please Enter the Content for Email notification</Text>
                            </View>}
                            <TouchableOpacity
                                style={Style.billBtn} onPress={() => { this.state.isfreeenabled ? this.checkSecondMore() : this.checkSecond() }}
                            >
                                <Text style={Style.lastBillTxt}>Save & Next</Text>
                            </TouchableOpacity>
                        </ScrollView>
                        {/* </ScrollView> */}
                    </Modal>


                    <Modal isVisible={this.state.editBillingModal}
                        onModalHide={() => {
                            this.state.editCheckcondition1 === true ? this.setState({ editRenewalTwoModal: true }) : null;
                            this.state.editCheckBackValue ? this.setState({ editBillingModal: false, editCheckBackValue: false, editCreateMembershipModal: true, editRenewalTwoModal: false }) : null
                        }}>
                        <ScrollView style={[Style.paymentModalBilling, { maxHeight: "72%" }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 10 }}
                                    onPress={() => { this.setState({ editCheckBackValue: true, editBillingModal: false, editRenewalTwoModal: false }) }}
                                >
                                    <Image source={require('../images/go.png')} style={{ width: 44, height: 44, }} resizeMode='contain' />
                                    <Text style={Style.folderText}>GO BACK</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: scale(10), position: 'absolute', right: 10, }}
                                    onPress={() => { this.setState({ editBillingModal: false, editCheckcondition1: false }); this.props.navigation.goBack() }}>
                                    <Image source={require('../images/videoclose.png')} style={{ width: 42, height: 38, }} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>

                            <Text style={Style.billTxt1}>Edit Billing Options</Text>
                            <Text style={Style.billTxt2}>Tier : {this.state.memberName}| {this.state.isEditFreeenabled ? 'Free' : 'Paid'}</Text>
                            {
                                this.state.isEditFreeenabled ?

                                    null :
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <Text style={Style.subBill101}>Monthly*</Text>

                                        <TextInput placeholder="$120"
                                            style={[Style.textViewPrice, {}]}
                                            keyboardType="number-pad"
                                            value={this.state.editMonthlyText.toString()}
                                            onChangeText={(text) => this.setState({ editMonthlyText: text, editMonthlyTextvalidate: false })} />

                                        {/* <TextInput placeholder="120$"
                                            style={[Style.textViewPrice, {}]}
                                            keyboardType="number-pad"
                                            value={this.state.monthlyText}
                                            onChangeText={(text) => this.setState({ monthlyText: text, monthlyTextvalidate: false })} /> */}



                                        <Text style={Style.subBill101}>Yearly*</Text>
                                        <TextInput placeholder="$120"
                                            keyboardType="number-pad"
                                            style={[Style.textViewPrice, {}]}
                                            value={this.state.editAnnualText.toString()}
                                            onChangeText={(text) => this.setState({ editAnnualText: text, editAnnualTextvalidate: false })} />

                                    </View>

                            }

                            {this.state.editMonthlyTextvalidate && <View>
                                <Text style={Style.textEmail}>Please Enter the Monthly Amount</Text>
                            </View>}

                            {this.state.editAnnualTextvalidate && <View>
                                <Text style={Style.textEmail}>Please Enter the Yearly Amount</Text>
                            </View>}

                            <Text style={Style.subBill1}>Send Notifications to*</Text>
                            <TextInput placeholder="yourname@companyname"
                                style={[Style.textViewBilling, { paddingLeft: 10, marginTop: 10 }]}
                                value={this.state.editNotificationText}
                                onChangeText={(text) => this.editHandleEmail(text)}
                            // onChangeText={(text) => this.setState({ notificationText: text, notificationTextvalidate: false, notificationEmailValidate: false })}
                            />
                            {this.state.editNotificationTextvalidate && <View>
                                <Text style={Style.textEmail}>Please Enter the notification</Text>
                            </View>}
                            {this.state.notificationEmailValidate && <View>
                                <Text style={Style.textEmail}>Please Enter the Valid Email</Text>
                            </View>}
                            {/* </View> */}
                            <Text style={Style.subBill1}>Content for Email notification*</Text>
                            <TextInput
                                multiline={true}
                                placeholder="Type here..." style={[Style.textViewBilling1, { paddingLeft: 15, marginLeft: 10, alignSelf: 'flex-start' }]}
                                value={this.state.editEmailNoti}
                                onChangeText={(text) => this.setState({ editEmailNoti: text, memberValidate: false, editDemailNotivalidate: false })} />
                            {this.state.editDemailNotivalidate && <View>
                                <Text style={Style.textEmail}>Please Enter the Content for Email notification</Text>
                            </View>}
                            <TouchableOpacity
                                style={Style.billBtn} onPress={() => {
                                    this.state.isEditFreeenabled ? this.editCheckSecondMore() : this.editCheckSecond();
                                    this.setState({ tabView: 2, })
                                }}
                            >
                                <Text style={Style.lastBillTxt}>Save & Next</Text>
                            </TouchableOpacity>
                        </ScrollView>
                        {/* </ScrollView> */}
                    </Modal>

                    <Modal isVisible={this.state.renewalTwoModal}
                        onModalHide={() => {
                            this.state.checkcondition100 ? this.setState({ renewalTwoModal: false, checkcondition100: false, billingModal: true }) : null;
                            this.state.newCheck ? this.setState({ renewalTwoModal: false, subscriptionModal: true, newCheck: false }) : null
                        }}
                    >
                        <View style={Style.paymentModalBilling2}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 10 }}
                                    onPress={() => { this.setState({ checkcondition100: true, renewalTwoModal: false, checkcondition1: false }); this.setState({ checkValue: true }) }}
                                >
                                    <Image source={require('../images/go.png')} style={{ width: 44, height: 44, }} resizeMode='contain' />
                                    <Text style={Style.folderText}>GO BACK</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: scale(10), position: 'absolute', right: 10, }}
                                    onPress={() => { this.setState({ renewalTwoModal: false }); this.props.navigation.goBack() }}>
                                    <Image source={require('../images/videoclose.png')} style={{ width: 42, height: 38, }} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>

                            <Text style={Style.billTxt1}>Renewal & Success Messages</Text>
                            <Text style={Style.billTxt2}>Tier : {this.state.memberName}| {this.state.isfreeenabled ? 'Free' : 'Paid'}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                                <TouchableOpacity style={[Style.tabView11, { backgroundColor: this.state.tabView1 === 0 ? '#12AEB4' : '#EBF7F6' }]} onPress={() => this.setState({ tabView1: 0 })}>
                                    <Text style={{ fontSize: 12, color: this.state.tabView1 === 0 ? '#ffffff' : '#506278', fontWeight: '500' }}>Success Messages</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[Style.tabView22, { backgroundColor: this.state.tabView1 === 1 ? '#12AEB4' : '#EBF7F6' }]} onPress={() => this.setState({ tabView1: 1 })}>
                                    <Text style={{ fontSize: 12, color: this.state.tabView1 === 1 ? '#ffffff' : '#506278', fontWeight: '500' }}>Renewal Reminder Email</Text>

                                </TouchableOpacity>
                            </View>

                            {this.state.tabView1 === 0 ? <View>
                                <View style={Style.toTxt}>
                                    <Text style={Style.subBill1}>Subject*</Text>
                                    <Text style={Style.subBill2}>Max 150 Characters</Text>
                                </View>

                                <TextInput placeholder="Thanks for subscribing to Golden plan"
                                    style={[Style.textViewBilling100, { marginTop: 10, paddingLeft: 15 }]}
                                    maxLength={150}
                                    value={this.state.planText}
                                    onChangeText={(text) => this.setState({ planText: text, memberValidate: false, planTextValidate: false })} />
                                {
                                    this.state.planTextValidate && <View>
                                        <Text style={Style.textEmail}>Please Enter the Subject</Text>
                                    </View>

                                }
                                <View style={Style.toTxt}>
                                    <Text style={Style.subBill1}>Descriptions*</Text>
                                    <Text style={Style.subBill2}>Max 500 Characters</Text>
                                </View>

                                <TextInput
                                    multiline={true}
                                    placeholder="Hi {Member Name}
                                    Thanks for subscribing to our gold plan."
                                    style={[Style.textViewBilling1, { paddingLeft: 15, marginLeft: 10, alignSelf: 'flex-start' }]}
                                    value={this.state.totaldescription}
                                    maxLength={500}
                                    onChangeText={(text) => this.setState({ totaldescription: text, memberValidate: false, descValidate: false })} />
                                {
                                    this.state.descValidate && <View>
                                        <Text style={Style.textEmail}>Please Enter the Description</Text>
                                    </View>

                                }

                            </View> :
                                // null}

                                // {this.state.tabView1 == 1 ? 
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={Style.billTxt5}>Subject*</Text>
                                        <Text style={{ marginTop: 15, color: '#BEBEBE', fontSize: 10, marginLeft: 10 }}>Max 150 Characters</Text>
                                    </View>
                                    <TextInput
                                        multiline={true}
                                        style={[Style.textViewBilling100, { marginTop: 10, paddingLeft: 15 }]}
                                        placeholder="Thanks for subscribing to Golden plan"
                                        //  style={{  }} 
                                        maxLength={150}
                                        value={this.state.secondrenew}
                                        onChangeText={(text) => this.setState({ secondrenew: text, renewValidate: false, secondrenewValue: 0 })} />
                                    {
                                        this.state.renewValidate &&
                                        <View>

                                            <Text style={Style.textEmail}>Please Enter the Subject</Text>
                                        </View>
                                    }
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={Style.billTxt5}>Description*</Text>
                                        <Text style={{ marginTop: 15, color: '#BEBEBE', fontSize: 10, marginLeft: 10 }}>Max 500 Characters</Text>
                                    </View>

                                    <TextInput
                                        placeholderTextColor="#C6C6C6"
                                        multiline={true}
                                        maxLength={500}
                                        placeholder="Hi {Member Name} ,
                                       Thanks for subscribing to our gold plan"

                                        style={[Style.textViewBilling1, { alignSelf: 'flex-start', marginLeft: 10, paddingLeft: 10, }]}
                                        value={this.state.seconddescription}
                                        onChangeText={(text) => this.setState({ seconddescription: text, descriptionValidate: false })} />
                                    {
                                        this.state.descriptionValidate && <View>

                                            <Text style={Style.textEmail}>Please Enter the Description</Text>
                                        </View>
                                    }
                                    {this.state.showLoader ? <ActivityIndicator size="large" color="#00ff00" /> : null}

                                </View>
                                //  : null
                            }

                            <TouchableOpacity
                                // style={Style.billBtn} onPress={() => { this.createSubs(this.state) }}
                                style={Style.billBtn} onPress={() => {
                                    // this.state.descValidate || this.state.planTextValidate ? this.setState({ tabView1: 0 }) :
                                    //     this.state.descriptionValidate || this.state.renewValidate ? this.setState({ tabView1: 1 })
                                    //         :
                                    this.createSubs(this.state)
                                }}

                            >
                                <Text style={Style.lastBillTxt}>Save & Next</Text>
                            </TouchableOpacity>

                        </View>
                    </Modal>

                    <Modal isVisible={this.state.editRenewalTwoModal}
                        onModalHide={() => {
                            this.state.editCheckcondition100 ? this.setState({ editRenewalTwoModal: false, editCheckcondition100: false, editBillingModal: true }) : null;
                            this.state.editNewCheck ? this.setState({ editRenewalTwoModal: false, subscriptionModal: true, editNewCheck: false }) : null
                        }}
                    // onModalHide={() => {
                    //     this.state.editCheckcondition100 ? this.setState({ editRenewalTwoModal: false, editCheckcondition100: false, editBillingModal: true }) : null;
                    //     this.state.editNewCheck ? this.setState({ editRenewalTwoModal: false, subscriptionModal: true, }) : null
                    //     this.state.editNewCheck ? this.consoleCheck() : null

                    // }}
                    >
                        <View style={Style.paymentModalBilling2}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 10 }}
                                    onPress={() => { this.setState({ editCheckcondition100: true, editRenewalTwoModal: false }); this.setState({ editCheckValue: true }) }}
                                >
                                    <Image source={require('../images/go.png')} style={{ width: 44, height: 44, }} resizeMode='contain' />
                                    <Text style={Style.folderText}>GO BACK</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: scale(10), position: 'absolute', right: 10, }}
                                    onPress={() => { this.setState({ editRenewalTwoModal: false }); this.props.navigation.goBack() }}>
                                    <Image source={require('../images/videoclose.png')} style={{ width: 42, height: 38, }} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>

                            <Text style={Style.billTxt1}>Edit Renewal & Success Messages</Text>
                            <Text style={Style.billTxt2}>Tier : {this.state.editMemberName}| {this.state.isEditFreeenabled ? 'Free' : 'Paid'}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                                <TouchableOpacity style={[Style.tabView11, { backgroundColor: this.state.tabView === 2 ? '#12AEB4' : '#EBF7F6' }]} onPress={() => this.setState({ tabView: 2 })}>
                                    <Text style={{ fontSize: 12, color: this.state.tabView === 2 ? '#ffffff' : '#506278', fontWeight: '500' }}>Success Messages</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[Style.tabView22, { backgroundColor: this.state.tabView === 3 ? '#12AEB4' : '#EBF7F6' }]} onPress={() => this.setState({ tabView: 3 })}>
                                    <Text style={{ fontSize: 12, color: this.state.tabView === 3 ? '#ffffff' : '#506278', fontWeight: '500' }}>Renewal Reminder Email</Text>

                                </TouchableOpacity>
                            </View>

                            {this.state.tabView === 2 ? <View>
                                <View style={Style.toTxt}>
                                    <Text style={Style.subBill1}>Subject*</Text>
                                    <Text style={Style.subBill2}>Max 150 Characters</Text>
                                </View>

                                <TextInput placeholder="Thanks for subscribing to Golden plan"
                                    style={[Style.textViewBilling100, { marginTop: 10, paddingLeft: 15 }]}
                                    maxLength={150}
                                    value={this.state.editPlanText}
                                    onChangeText={(text) => this.setState({ editPlanText: text, memberValidate: false, editPlanTextValidate: false })} />
                                {
                                    this.state.editPlanTextValidate && <View>
                                        <Text style={Style.textEmail}>Please Enter the Subject</Text>
                                    </View>

                                }
                                <View style={Style.toTxt}>
                                    <Text style={Style.subBill1}>Descriptions*</Text>
                                    <Text style={Style.subBill2}>Max 500 Characters</Text>
                                </View>

                                <TextInput
                                    multiline={true}
                                    placeholder="Hi {Member Name}
                                    Thanks for subscribing to our gold plan."
                                    style={[Style.textViewBilling1, { paddingLeft: 15, marginLeft: 10, alignSelf: 'flex-start' }]}
                                    value={this.state.editTotaldescription}
                                    maxLength={500}
                                    onChangeText={(text) => this.setState({ editTotaldescription: text, memberValidate: false, editDescValidate: false })} />
                                {
                                    this.state.editDescValidate && <View>
                                        <Text style={Style.textEmail}>Please Enter the Description</Text>
                                    </View>

                                }

                            </View> : null}

                            {this.state.tabView === 3 ? <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={Style.billTxt5}>Subject*</Text>
                                    <Text style={{ marginTop: 15, color: '#BEBEBE', fontSize: 10, marginLeft: 10 }}>Max 150 Characters</Text>
                                </View>

                                <TextInput
                                    multiline={true}
                                    style={[Style.textViewBilling100, { marginTop: 10, paddingLeft: 15 }]}
                                    placeholder="Thanks for subscribing to Golden plan"
                                    //  style={{  }}
                                    maxLength={150}
                                    value={this.state.editSecondrenew}
                                    onChangeText={(text) => this.setState({ editSecondrenew: text, editRenewValidate: false })} />
                                {
                                    this.state.editRenewValidate && <View>

                                        <Text style={Style.textEmail}>Please Enter the Subject</Text>
                                    </View>
                                }
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={Style.billTxt5}>Description*</Text>
                                    <Text style={{ marginTop: 15, color: '#BEBEBE', fontSize: 10, marginLeft: 10 }}>Max 500 Characters</Text>
                                </View>

                                <TextInput
                                    placeholderTextColor="#C6C6C6"
                                    multiline={true}
                                    maxLength={500}
                                    placeholder="Hi {Member Name} ,
                                       Thanks for subscribing to our gold plan"

                                    style={[Style.textViewBilling1, { alignSelf: 'flex-start', marginLeft: 10, paddingLeft: 10, }]}
                                    value={this.state.editSeconddescription}
                                    onChangeText={(text) => this.setState({ editSeconddescription: text, editdescriptionValidate: false })} />
                                {
                                    this.state.editdescriptionValidate && <View>

                                        <Text style={Style.textEmail}>Please Enter the Description</Text>
                                    </View>
                                }
                                {this.state.showLoader ? <ActivityIndicator size="large" color="#00ff00" /> : null}

                            </View> : null}

                            <TouchableOpacity
                                // style={Style.billBtn} onPress={() => { this.createSubs(this.state) }}
                                style={Style.billBtn} onPress={() => {
                                    this.state.editdescriptionValidate || this.state.editRenewValidate ? this.setState({ tabView: 3 })
                                        :
                                        this.state.editDescValidate || this.state.editPlanTextValidate ? this.setState({ tabView: 2 }) : this.editCreateSubs(this.state)
                                }}

                            >
                                <Text style={Style.lastBillTxt}>Save & Next</Text>
                            </TouchableOpacity>

                        </View>
                    </Modal>


                    <Modal isVisible={this.state.createMembershipModal}
                        onModalHide={() => {
                            this.state.checkcondition ? this.setState({ billingModal: true }) : null;
                            // this.state.closemodal === true ? this.setState({ subscriptionModal: true }) : null;
                            this.state.subsValue1 ? this.setState({ subscriptionModal: true, createMembershipModal: false, subsValue1: false }) : null

                        }}>
                        <KeyboardAwareScrollView>
                            <ScrollView style={[Style.modalContainer11, {}]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25 }}>
                                    {/* <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 10 }}
                                        onPress={() => this.setState({ createMembershipModal: false, checkcondition: false,closemodal:true })}
                                    >
                                        <Image source={require('../images/go.png')} style={{ width: 44, height: 44, }} resizeMode='contain' />
                                        <Text style={Style.folderText}>GO BACK</Text>

                                    </TouchableOpacity> */}
                                    <TouchableOpacity style={{ marginLeft: scale(10), position: 'absolute', right: 10, }}
                                        onPress={() => { this.setState({ createMembershipModal: false, subsValue1: true, checkcondition: false }); }}>
                                        <Image source={require('../images/videoclose.png')} style={{ width: 42, height: 38, }} resizeMode='contain' />
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity style={{ marginLeft: scale(10), position: 'absolute', right: 10, }}
                                        onPress={() => { this.setState({ createMembershipModal: false, checkcondition: false, subsValue1: true }); this.props.navigation.goBack() }}>
                                        <Image source={require('../images/videoclose.png')} style={{ width: 42, height: 38, }} resizeMode='contain' />
                                    </TouchableOpacity> */}
                                </View>
                                <Text style={Style.folderText22}>Create Membership Level</Text>
                                <View style={Style.homeView}>
                                    <Text style={Style.membershipName}>Tier*</Text>
                                    <Text style={Style.laterText11}>Max 50 Characters</Text>
                                </View>

                                <TextInput
                                    style={Style.titleText}
                                    placeholderTextColor="#C6C6C6"
                                    value={this.state.memberName}
                                    onChangeText={(text) => this.setState({ memberName: text, memberNamevalidate: false })}
                                    maxLength={50}
                                    placeholder="Gold" />

                                {this.state.memberNamevalidate && <View>
                                    <Text style={Style.textEmail}>Please Enter the Tier Name</Text>
                                </View>}
                               
                                <View style={Style.homeView}>
                                    <Text style={Style.membershipName}>Description*</Text>
                                    <Text style={Style.laterText11}>Max 150 Characters</Text>
                                </View>
                                <TextInput
                                    style={Style.titleText}
                                    placeholderTextColor="#C6C6C6"
                                    value={this.state.description}
                                    onChangeText={(text) => this.setState({ description: text, memberValidate: false, descriptionvalidate: false })}
                                    maxLength={150}
                                    placeholder="Write about inclusions in this tier" />
                                {this.state.descriptionvalidate && <View>
                                    <Text style={Style.textEmail}>Please Enter the Description</Text>
                                </View>}
                                <View style={Style.homeView}>
                                    <Text style={Style.membershipName11}>Thumbnail Image(Optional)</Text>
                                    <Text style={Style.laterText11}>1000x1000px</Text>
                                </View>
                                <TouchableOpacity style={Style.logoView}>
                                    <TouchableOpacity onPress={() => { this.showActionSheet(); }}>
                                        {this.state.image ? <Image source={{ uri: this.state.image }} style={Style.imageLogo} /> : <Image source={require('../images/imagelogo.png')} style={Style.imageLogo} />}
                                    </TouchableOpacity >
                                    <TouchableOpacity style={{ position: "absolute", top: -20, right: -20 }} onPress={() => { this.showActionSheet(); }}>

                                        <Image source={require('../images/editlogo.png')} />
                                    </TouchableOpacity>
                                </TouchableOpacity>

                                <ActionSheet
                                    ref={o => { this.ActionSheet = o }}
                                    title={title}
                                    options={options}
                                    cancelButtonIndex={CANCEL_INDEX}
                                    onPress={this.handlePress}
                                />

                                <View style={Style.homeView}>
                                    <Text style={Style.membershipName}>SignUp button Text*</Text>
                                </View>


                                <TextInput
                                    style={Style.titleText}
                                    placeholderTextColor="#C6C6C6"
                                    value={this.state.subsText}
                                    onChangeText={(text) => this.setState({ subsText: text, memberValidate: false, subsTextvalidate: false })}
                                    maxLength={50}
                                    placeholder="subscribe now" />
                                {this.state.subsTextvalidate && <View>
                                    <Text style={Style.textEmail}>Please Enter the SignUp button Text</Text>
                                </View>}
                                <View style={Style.homeView}>
                                    <Text style={Style.membershipName}>Is this Level Paid or Free*</Text>
                                </View>
                                <View style={[Style.memberLevels, { height: verticalScale(120), }]}>
                                    <View style={[Style.homeView, { marginTop: 20, borderBottomWidth: 0.5, height: 40 }]}>
                                        <Text style={{ fontSize: 15, marginLeft: 30 }}>Free</Text>
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#767577" }}
                                            thumbColor={this.state.isfreeenabled ? "#12AEB4" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => this.setState({ isfreeenabled: !this.state.isfreeenabled, toggleError: false })}
                                            value={this.state.isfreeenabled}
                                            style={{ position: 'absolute', right: 10 }}
                                            disabled={this.state.ispastenabled === true ? true : false}
                                        />
                                    </View>
                                    <View style={[Style.homeView, { marginTop: 20, borderBottomWidth: 0.5, height: 40, }]}>
                                        <Text style={{ fontSize: 15, marginLeft: 30 }}>Paid</Text>
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#767577" }}
                                            thumbColor={this.state.ispastenabled ? "#12AEB4" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => this.setState({ ispastenabled: !this.state.ispastenabled, toggleError: false })}
                                            value={this.state.ispastenabled}
                                            style={{ position: 'absolute', right: 10 }}
                                            disabled={this.state.isfreeenabled === true ? true : false}
                                        />
                                    </View>

                                </View>
                                {
                                    this.state.toggleError && <View>
                                        <Text style={Style.textEmail}>Please Select Atleast One Level</Text>
                                    </View>
                                }

                                <TouchableOpacity style={[Style.loginContainer, { top: -20 }]}
                                    onPress={() => this.checkFirst()}>
                                    <Text style={Style.loginText}>Save & Next</Text>
                                </TouchableOpacity>

                            </ScrollView>
                        </KeyboardAwareScrollView>
                    </Modal>
                    <Modal isVisible={this.state.editCreateMembershipModal}
                        onModalHide={() => {
                            this.state.editCheckCondition ? this.setState({ editBillingModal: true }) : null;
                            this.state.subsValue ? this.setState({ subscriptionModal: true, editCreateMembershipModal: false, subsValue: false, editBillingModal: false }) : null
                            // this.state.closemodal === true ? this.setState({ subscriptionModal: true }) : null
                        }}>
                        <KeyboardAwareScrollView>
                            <ScrollView style={[Style.modalContainer11, {}]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25 }}>
                                    {/* <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 10 }}
                                        onPress={() => this.setState({ createMembershipModal: false, checkcondition: false,closemodal:true })}
                                    >
                                        <Image source={require('../images/go.png')} style={{ width: 44, height: 44, }} resizeMode='contain' />
                                        <Text style={Style.folderText}>GO BACK</Text>

                                    </TouchableOpacity> */}
                                    <TouchableOpacity style={{ marginLeft: scale(10), position: 'absolute', right: 10, }}
                                        onPress={() => { this.setState({ editCreateMembershipModal: false, subsValue: true, editBillingModal: false }); }}>
                                        <Image source={require('../images/videoclose.png')} style={{ width: 42, height: 38, }} resizeMode='contain' />
                                    </TouchableOpacity>
                                </View>
                                <Text style={[Style.folderText22, { marginTop: 20 }]}>Edit Create Membership Level</Text>
                                <View style={Style.homeView}>
                                    <Text style={Style.membershipName}>Tier*</Text>
                                    <Text style={Style.laterText11}>Max 50 Characters</Text>
                                </View>
                                <TextInput
                                    style={Style.titleText}
                                    placeholderTextColor="#C6C6C6"
                                    value={this.state.editMemberName}
                                    onChangeText={(text) => this.setState({ editMemberName: text, editMemberNamevalidate: false })}
                                    maxLength={50}
                                    placeholder="Gold" />

                                {this.state.editMemberNamevalidate && <View>
                                    <Text style={Style.textEmail}>Please Enter the Tier Name</Text>
                                </View>}

                                <View style={Style.homeView}>
                                    <Text style={Style.membershipName}>Description*</Text>
                                    <Text style={Style.laterText11}>Max 150 Characters</Text>
                                </View>
                                <TextInput
                                    style={Style.titleText}
                                    placeholderTextColor="#C6C6C6"
                                    value={this.state.ediDescription}
                                    onChangeText={(text) => this.setState({ ediDescription: text, memberValidate: false, editDescriptionvalidate: false })}
                                    maxLength={150}
                                    placeholder="Write about inclusions in this tier" />
                                {this.state.editDescriptionvalidate && <View>
                                    <Text style={Style.textEmail}>Please Enter the Description</Text>
                                </View>}
                                <View style={Style.homeView}>
                                    <Text style={Style.membershipName11}>Thumbnail Image(Optional)</Text>
                                    <Text style={Style.laterText11}>1000x1000px</Text>
                                </View>
                                <TouchableOpacity style={Style.logoView}>
                                    <TouchableOpacity onPress={() => { this.showActionSheet(); }}>
                                        {this.state.editImage ? <Image source={{ uri: this.state.editImage }} style={Style.imageLogo} /> : <Image source={require('../images/imagelogo.png')} style={Style.imageLogo} />}
                                    </TouchableOpacity >
                                    <TouchableOpacity style={{ position: "absolute", top: -20, right: -20 }} onPress={() => { this.showActionSheet(); }}>

                                        <Image source={require('../images/editlogo.png')} />
                                    </TouchableOpacity>
                                </TouchableOpacity>

                                <ActionSheet
                                    ref={o => { this.ActionSheet = o }}
                                    title={title}
                                    options={options}
                                    cancelButtonIndex={CANCEL_INDEX}
                                    onPress={this.editHandlePress}
                                />

                                <View style={Style.homeView}>
                                    <Text style={Style.membershipName}>SignUp button Text*</Text>
                                </View>


                                <TextInput
                                    style={Style.titleText}
                                    placeholderTextColor="#C6C6C6"
                                    value={this.state.editSubsText}
                                    onChangeText={(text) => this.setState({ editSubsText: text, memberValidate: false, editSubsTextvalidate: false })}
                                    maxLength={50}
                                    placeholder="subscribe now" />
                                {this.state.editSubsTextvalidate && <View>
                                    <Text style={Style.textEmail}>Please Enter the SignUp button Text</Text>
                                </View>}
                                <View style={Style.homeView}>
                                    <Text style={Style.membershipName}>Is this Level Paid or Free*</Text>
                                </View>
                                <View style={[Style.memberLevels, { height: verticalScale(120), }]}>


                                    <View style={[Style.homeView, { marginTop: 20, borderBottomWidth: 0.5, height: 40 }]}>
                                        <Text style={{ fontSize: 15, marginLeft: 30 }}>Free</Text>
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#767577" }}
                                            thumbColor={this.state.isEditFreeenabled ? "#12AEB4" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => this.setState({ isEditFreeenabled: !this.state.isEditFreeenabled, editToggleError: false })}
                                            value={this.state.isEditFreeenabled ? true : false}
                                            style={{ position: 'absolute', right: 10 }}
                                            disabled={this.state.isEditpastenabled === true ? true : false}
                                        />
                                    </View>
                                    <View style={[Style.homeView, { marginTop: 20, borderBottomWidth: 0.5, height: 40, }]}>
                                        <Text style={{ fontSize: 15, marginLeft: 30 }}>Paid</Text>
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#767577" }}
                                            thumbColor={this.state.isEditpastenabled ? "#12AEB4" : "#f4f3f4"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => this.setState({ isEditpastenabled: !this.state.isEditpastenabled, toggleError: false })}
                                            value={this.state.isEditpastenabled ? true : false}
                                            style={{ position: 'absolute', right: 10 }}
                                            disabled={this.state.isEditFreeenabled === true ? true : false}
                                        />
                                    </View>

                                </View>
                                {
                                    this.state.editToggleError && <View>
                                        <Text style={Style.textEmail}>Please Select Atleast One Level</Text>
                                    </View>
                                }

                                <TouchableOpacity style={[Style.loginContainer, { top: -20 }]}
                                    onPress={() => this.editCheckFirst()}>
                                    <Text style={Style.loginText}>Save & Next</Text>
                                </TouchableOpacity>

                            </ScrollView>
                        </KeyboardAwareScrollView>
                    </Modal>
                    <Modal isVisible={this.state.subscriptionModal}
                        onModalHide={() => {
                            this.state.newCheckValue ? this.setState({ createMembershipModal: true, subscriptionModal: false }) : null;
                            this.state.editCreate ? this.setState({ editCreateMembershipModal: true, editCreate: false }) : null
                        }}
                    >
                        <View style={Style.modalContainerSubs}>
                            <TouchableOpacity style={{ marginLeft: scale(10), position: 'absolute', right: 10, }}
                                onPress={() => { this.setState({ subscriptionModal: false }); this.props.navigation.goBack() }}>
                                <Image source={require('../images/videoclose.png')} style={{ width: 42, height: 38, marginTop: 5 }} resizeMode='contain' />
                            </TouchableOpacity>
                            <TouchableOpacity style={[Style.loginContainer, { width: '70%', marginTop: 50 }]} onPress={() => this.setState({ newCheckValue: true, tabCheck: true, subscriptionModal: false })}>
                                <Text style={[Style.loginText, { fontSize: 16 }]}>ADD MEMBERSHIP LEVEL</Text>
                            </TouchableOpacity>
                            <Text style={{ fontWeight: '600', textAlign: 'center', marginTop: 5, fontSize: 18, color: '#333244', }}>Membership Level Subscription List</Text>

                            <FlatList
                                style={{ width: '100%', marginTop: 10, marginBottom: 10, flexGrow: 0, height: 475 }}
                                data={listItem.result}
                                removeClippedSubviews={false}
                                renderItem={this.render_ListData}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        )
    }

}
