import React from 'react';
import {View,Text,Animated,PanResponder,Dimensions} from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25*SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends React.Component{

    static defaultProps ={
        onSwipeRight:()=>{},
        onSwipeLeft:()=>{}
    }

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
                    this.forceSwipe('right')
                }else if(gesture.dx < -SWIPE_THRESHOLD){
                    this.forceSwipe('left')
                }else {
                    this.resetPosition()
                }
                
            }
        })

        this.state = {panResponder,position,index:0}
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
        if(this.state.index >= this.props.data.length){
            return this.props.renderNoMoreCards()
        }

        return this.props.data.map((item,i)=>{
            if(i < this.state.index){return null;}

            if(i === this.state.index){
                return (
                    <Animated.View
                        key={item.key}
                        style={[this.getCardStyle(),styles.cardStyle,{zIndex:100}]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }

            return (
                <View key={item.key} style={[styles.cardStyle,{zIndex:5}]}>
                    {this.props.renderCard(item)}
                </View>
            )
        }).reverse()
    }

    forceSwipe(direction){
        const x = direction === 'right' ?SCREEN_WIDTH:-SCREEN_WIDTH;

        Animated.timing(this.state.position,{
            toValue:{x,y:0},
            duration:SWIPE_OUT_DURATION
        }).start(()=>this.onSwipeComplete(direction))
        this.state.position.setValue({x:0,y:0})
        this.setState({index:this.state.index + 1})
    }

    onSwipeComplete(direction){
        const {onSwipeRight,onSwipeLeft,data} = this.props;
        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
    }

    render(){
        return (
            <View style={styles.deckStyle}>
                {this.renderCards()}
            </View>    
            
        )
    }
}


const styles ={
    cardStyle:{
        position:'absolute',
        // width:SCREEN_WIDTH
    },
    deckStyle:{
        marginTop:15
    }
}

export default Deck;