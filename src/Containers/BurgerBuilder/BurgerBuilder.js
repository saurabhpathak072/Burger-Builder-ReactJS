import React, { Component } from 'react'
// import PropTypes from 'prop-types';

import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spineer';

const INGREDIENT_PRICES={
    salad:2,
    bacon:12,
    cheese:13,
    meat:5

}

export default class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         ...
    //     }
    // }

    state ={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false
    }

    updatePurchaseState =(ingredients)=>{
        // const ingredients ={
        //     ...this.state.ingredients
        // };
        const sum =Object.keys(ingredients)
        .map((igKey)=>{return ingredients[igKey]}).reduce((sum,el)=>{
            return sum + el;
        },0);
        this.setState({
            purchasable:sum > 0
        })
    }

    addIngredientHandler =(type)=>{
       const oldCount = this.state.ingredients[type];
       const updatedCounted = oldCount + 1;
       const updatedIngredients ={
           ...this.state.ingredients
       };
       updatedIngredients[type]=updatedCounted;
       const priceAddition = INGREDIENT_PRICES[type];
       const oldPrice = this.state.totalPrice;
       const newPrice = oldPrice + priceAddition;
       this.setState({totalPrice:newPrice,ingredients: updatedIngredients});
       this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice,ingredients: updatedIngredients}); 
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseHandler =()=>{
        this.setState({
            purchasing:true
        })
    }
    purchaseCancelHandler =()=>{
        this.setState({purchasing:false
        });
    }
    purchaseContinueHandler =()=>{
        // alert("You can Continue!!");
        this.setState({loading:true});
        const order={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'Saurabh',
                address:{
                    street:'testStreet',
                    zipCode:'445001',
                    country:'India'
                },
                email:'test@test.com'
            },
            deliveryMethod:"Fastest"
        }
        Axios.post('/order.json',order)
        .then(res=>{
            this.setState({loading:false,purchasing:false});
        })
        .catch(error=>{
            this.setState({loading:false,purchasing:false});
            console.log(error);});
    }

    render() {
        const disabledInfo ={
            ...this.state.ingredients
        }
        for (let keys in disabledInfo){
            disabledInfo[keys]=disabledInfo[keys]<=0
        }
        let orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
        />
        if(this.state.loading){
            orderSummary =<Spinner />;
        }
        //structure {salad:true,meat:false, ...}
        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               <Burger ingredients={this.state.ingredients}/>
               <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler}
               />
            </>
        )
    }
}
