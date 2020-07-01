import React, { Component } from 'react';
import Spinner from '../../../Components/UI/Spinner/Spineer'
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import Axios from '../../../axios-order';

export default class ContactData extends Component {
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }
    orderHandler =(event)=>{
        event.preventDefault();
        console.log(this.props.ingredients);
        
        this.setState({loading:true});
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
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
            this.setState({loading:false});
            this.props.history.push('/');
        })
        .catch(error=>{
            this.setState({loading:false});
});
       
    }
    render() {
        let form =(
            <form>
                    <input type="text" name="name" placeholder="your Name"></input>
                    <input type="email" name="email" placeholder="your Email"></input>
                    <input type="text" name="street" placeholder="your address"></input>
                    <input type="text" name="postal" placeholder="Postal code"></input>
                    <Button
                     btnType="Success"
                     clicked={this.orderHandler}>ORDER</Button>
                </form>

        );
        if(this.state.loading){
            form=<Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter YourContact Data</h4>
                {form}                
            </div>
        )
    }
}
