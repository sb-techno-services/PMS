import React, { useState, useContext,useEffect,Component} from 'react';
import {Alert,AppTextInput , Picker ,Dimensions, StatusBar,SafeAreaView ,StyleSheet, Text,TouchableOpacity,View ,Image,TextInput,AppButton, ScrollView} from 'react-native';
import Button from '../../components/AppButton';
import img1 from '../../assets/images/homeback.png';
import jobicon from '../../assets/images/jobsimg.png';
import { MaterialCommunityIcons,FontAwesome5,AntDesign,Entypo } from '@expo/vector-icons';
import { Auth ,API ,graphqlOperation} from 'aws-amplify';
import sort from '../../assets/images/sort.png';
import ModalDropdown from 'react-native-modal-dropdown';
import Navbar from '../../components/Navbar';
import Menubar from '../../components/Menubar';
import Icon from 'react-native-remix-icon';
import * as queries from '../../src/graphql/queries';
import { useIsFocused } from "@react-navigation/native";
import Loading from '../../components/Loading';
import img11 from '../../assets/images/home.png';
import moment from 'moment';
var { height } = Dimensions.get('window');
  var box_count = 12;
  var box_height = height / box_count;

export default function SM_ServiceHistory ({navigation}){
    const [id, setID] = useState('');
    const [pos, setPos] = useState(false);
  const [his, setHis] = useState('');
  const [datechecker, setDatechecker] = useState(false);
  const [data, setData] = useState('');
  const isFocused = useIsFocused();
  const [time, setTime] = useState(new Date(Date.now()));
    const createTwoButtonAlert = (item) =>
    Alert.alert(
        "Enter Job",
        "Do you want to start/continue the job now ?",
        [
        {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
        },
        { 
            text: "OK", 
            onPress: () => {
                navigation.navigate('SM_LiveJob',{
                p1:item.id
                });
            }
        }
        ]
    );

    useEffect(() => {  
        fetchData();
      }, [pos]);


    const fetchData =async() =>{
        try{
            const user = await Auth.currentAuthenticatedUser();
            setID(user.attributes['email']);
            let filter = {
                servicemanid: {
                    eq:user.attributes['email']
                }
            };
            const oneTodo = await API.graphql({ query: queries.listServices, variables: { filter: filter}});
            setData(oneTodo.data.listServices.items);
            console.log('oneTodo ',oneTodo);
            setPos(true);
        }
        catch(err){
            console.log('error fetching data ',err);
        }
    };
  
   if(!pos)return <Loading/>;
   else if(data.length==0){
    return(
        <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
           <StatusBar animated = {true}
                      backgroundColor="#000000"/>
            <Menubar navigation={navigation} />
                
            </View>
                   
              <Text style={styles.text}>No scheduled jobs</Text>
              <Image  style = {styles.img11} 
                     source = {img11} />           
        </SafeAreaView>
    );
   }
   else{
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
        
        <View style={styles.container}>
            <StatusBar animated = {true}
                            backgroundColor="#000000"/>   
                    <Menubar navigation={navigation} />  
            </View> 
            <ScrollView>
            <View style={styles.Second}>
                <Text style={styles.serTxt}>Scheduled Jobs</Text>
            </View>
            {/* <View style = {styles.sortB}>
                    <Text style={styles.filtxt}>Sort</Text>
                    <TouchableOpacity style = {styles.sortButton} 
                    onPress = {() => {alert("you clicked")}}>
                        <Icon name="arrow-up-down-line" />
                    </TouchableOpacity>
                </View> */}
            {data.map((item, index) => (
                <View key={index} style={{marginLeft:3}}>
                <View   >
                    
                    <View>
                    <View style={styles.Third}>
                        
                        <Entypo name="controller-record" size={14} style={styles.cirIcon}/>
                            <Text style={styles.dateTxt}>{item.createdAt.slice(0,10)}</Text>
                    </View>
                    <View style={styles.Fourth}>
                    </View>
                    </View>

                 <View style={styles.Fifth}>
                     <View style = {styles.five1}>
                     <View style={styles.fivep1}>
                         <AntDesign name="minus" style={styles.minusIcon} size={20} />
                         <Text style={styles.sideTxt}>{item.block_name}</Text>
                         </View>
                         <View style={styles.fivep1}>
                         <AntDesign name="minus" style={styles.minusIcon} size={20} />
                         <Text style={styles.sideTxt}>{item.category}</Text>
                         </View>
                         <View style={styles.fivep1}>
                         <AntDesign name="minus" style={styles.minusIcon} size={20} />
                         <Text style={styles.sideTxt}>{item.smtime} </Text>
                         </View>
                     </View>
                        
                     <View style={styles.five2}>
                        
                        <TouchableOpacity style={styles.r2} onPress={() => createTwoButtonAlert(item) }  >
                            <MaterialCommunityIcons name="triangle-outline" style={{marginLeft:3  ,transform: [{ rotate: '90deg' }]}} size={0.35*box_height} color="#ffffff" />
                        </TouchableOpacity>
                       
                     <Image  style = {styles.img} 
                     source = {img1} />
                     </View>
                 </View>
                 </View  >
                
            
            </View>
                    
                    
               ))}
               <View style={{height:3*box_height}}/>

                 </ScrollView>
                 <Navbar navigation={navigation}/>
        </SafeAreaView>
    );}
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    text:{
        marginVertical:40,
         color:"#00286B",
         fontSize:30,
         alignSelf:'center',
         fontWeight:'bold'
        
    },
    img11 :{
        alignSelf:'center',
        marginTop:20,
        height:height*0.20,
        width:'50%'
    },
    First :{
      height : 0.5*box_height
    },
    Second:{
        paddingVertical:0.3*box_height,
     // height:1*box_height,
    },
    serTxt:{
        fontWeight:'bold',
        fontSize:0.45*box_height,
        alignSelf:'center'
    },
    sortB:{
        flexDirection:'row',
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        alignSelf:'center',
        alignContent:'center',
        height:0.65*box_height,
        borderWidth : 2,
        width:"28%",
        borderColor : '#005DAF',
        marginBottom  :0.3*box_height,
    },
    filtxt:{  
        padding:3,
        marginLeft:16,
        alignContent:'center',
        alignSelf:'center',
        fontSize:20
    },
    sortButton:{
        marginTop:5,
        padding:3,
        marginLeft:5,
        width:'10%',
        height:0.3*box_height
        
    },
    Third:{
        marginLeft:20,
     height:0.5*box_height,
     flexDirection:'row',
     
    },
    cirIcon:{
       color:'#00286B',
       alignSelf:'center'
    },
    dateTxt:{
        padding:3,
     fontSize:0.35*box_height
    },
    Fourth:{
        height:0.02*box_height,
         width:'80%',
         alignSelf:'center',
         marginTop:5,
         marginBottom  :0.3*box_height,
         backgroundColor:"#00286B"
     },
     Fifth:{
         padding:8,
         height:2.8*box_height,
       flexDirection:'row',
      
     },
     Sixth:{
        padding:8,
        marginTop:10,
        height:2.8*box_height,
        flexDirection:'row',
     
    },
     five1:{
         marginTop:0.3*box_height,
        backgroundColor:'#1364A9',
         width:'90%',
         height:2.2*box_height,
        flexDirection:'column',
        borderWidth : 2,
        borderColor : '#000000',
     },
     five2:{
        width:'40%',
        height:2.8*box_height,
        position:'absolute',
        right:'5%',
        flexDirection:'row'
     },
     fivep1:{
        flexDirection:'row',
        width:'100%'
     },
     minusIcon:{
       color:'#ffffff',
       paddingRight:10,
       paddingTop:10,
       paddingBottom:10
     },
     sideTxt:{
        color:'#ffffff',
        paddingTop:8,
        paddingBottom:8,
        fontSize:0.3*box_height
     },
     img:{
         width:'100%',
         height:'100%',
         position:'absolute'
     },
     r1:{
        top:'100%',
        right:'55%',
        backgroundColor:'#47AFFF',
        borderWidth:2,
        borderColor:'#005DAF',
        alignItems:'center',
        justifyContent:'center',
        height:0.55*box_height,
        width:0.55*box_height,
        borderTopRightRadius:10,
        borderTopLeftRadius:10
        
     },
     
     r2:{
        top:'100%',
        right:'40%',
        backgroundColor:'#47AFFF',
        borderWidth:2,
        borderColor:'#005DAF',
        alignItems:'center',
        justifyContent:'center',
        height:0.55*box_height,
        width:0.55*box_height,
        borderTopRightRadius:10,
        borderTopLeftRadius:10
        
     },
    botmBox  : {
        width:'100%',
        height:box_height,
        borderTopRightRadius : 40,
        borderTopLeftRadius:40,
        borderWidth:5,
        borderColor:"#00286B",
        marginBottom:2,
        position: 'absolute', 
        bottom: 0,
        flex : 1,
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
   b1:{
       padding:7,     
   },
   Text1 :{
       flexDirection:'row', 
       alignSelf:'flex-start',
       marginLeft:40,
       padding:2 
   }

 
});