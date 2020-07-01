import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';

export default class Checkout extends Component {
    state={
        ingredients:null,
        totalPrice:0
    }

    checkoutCanceledHandler =()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price =0;
        for(let param of query.entries()){
            //['salad',1]
            if(param[0]==='price'){
                price=param[1];
            }else
            {ingredients[param[0]]= +param[1];}
        }
        this.setState({ingredients,totalPrice:price});
    }
    render() {
        
        return (
            <div>
                <CheckoutSummary
                 ingredients={this.state.ingredients}
                 checkoutCanceled={this.checkoutCanceledHandler}
                 checkoutContinued={this.checkoutContinuedHandler}/>
                 <Route
                  path={this.props.match.path+ '/contact-data'} 
                  render={()=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props}/>)} /> 
            </div>
        )
    }
}
