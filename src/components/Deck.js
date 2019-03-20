import React from 'react';
import {View,Text,Animated,PanResponder} from 'react-native';


class Deck extends React.Component{

    constructor(props){

        const position = new Animated.ValueXY()

        super(props);
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder:()=>{return true;},
            onPanResponderMove:(event,gesture)=>{
                position.setValue({x:gesture.dx,y:gesture.dy})
            },
            onPanResponderRelease:()=>{}
        })

        this.state = {panResponder,position}
    }
    renderCards(){
        return this.props.data.map((item)=>{
            return this.props.renderCard(item);
        })
    }
    render(){
        return (
            <Animated.View {...this.state.panResponder.panHandlers} style={this.state.position.getLayout()}>
                {this.renderCards()}
            </Animated.View>
        )
    }
}


export default Deck;