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
        return this.props.data.map((item,index)=>{
            if(index === 0){
                return (
                    <Animated.View
                        key={item.key}
                        style={this.state.position.getLayout()}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }

            return this.props.renderCard(item);
        })
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