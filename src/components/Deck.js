import React from 'react';
import {View,Text,Animated,PanResponder,Dimensions} from 'react-native';
import { duration } from 'moment';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25*SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends React.Component{

    constructor(props){

        const position = new Animated.ValueXY()

        super(props);
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder:()=>{return true;},
            onPanResponderMove:(event,gesture)=>{
                position.setValue({x:gesture.dx,y:gesture.dy})
            },
            onPanResponderRelease:(event,gesture)=>{
                if(gesture.dx > SWIPE_THRESHOLD){
                    this.forceSwipeRight()
                }else if(gesture.dx < -SWIPE_THRESHOLD){
                    console.log('Left Shift')
                }else {
                    this.resetPosition()
                }
                
            }
        })

        this.state = {panResponder,position}
    }


    resetPosition(){
        Animated.spring(this.state.position,{toValue:{x:0,y:0}}).start();
    }

    getCardStyle(){
        const {position} = this.state;
        const rotate = position.x.interpolate({
            inputRange:[-SCREEN_WIDTH*1.5,0,SCREEN_WIDTH*1.5],
            outputRange:['-120deg','0deg','120deg']
        })
        return {
            ...position.getLayout(),
            transform: [{rotate}]
        }
    }

    renderCards(){
        return this.props.data.map((item,index)=>{
            if(index === 0){
                return (
                    <Animated.View
                        key={item.key}
                        style={this.getCardStyle()}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }

            return this.props.renderCard(item);
        })
    }

    forceSwipeRight(){
        Animated.timing(this.state.position,{
            toValue:{x:SCREEN_WIDTH,y:0},
            duration:SWIPE_OUT_DURATION
        }).start()
    }

    render(){
        return (
            <View>
                {this.renderCards()}
            </View>    
            
        )
    }
}


export default Deck;