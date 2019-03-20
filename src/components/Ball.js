
import React from 'react';
import {View,Animated} from 'react-native';

class Ball extends React.Component{


    constructor(props){
        super(props)
        this.position = new Animated.ValueXY(0,0);
         Animated.spring(this.position,{toValue:{x:200,y:500}
        }).start()


    }


    render(){
        return (
           <Animated.View style={this.position.getLayout()}>
                <View style={StyleSheet.ball}></View>
           </Animated.View>
        )
    }
}

const StyleSheet = {
    ball:{
        height:60,
        width:60,
        borderRadius:30,
        borderWidth:30,
        borderColor:'black'
    }
}

export default Ball;