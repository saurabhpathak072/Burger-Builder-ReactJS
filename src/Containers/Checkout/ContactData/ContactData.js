import React, { Component } from 'react';
import Spinner from '../../../Components/UI/Spinner/Spineer'
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import Axios from '../../../axios-order';
import Input from '../../../Components/UI/Input/Input';

export default class ContactData extends Component {
    state={
        orderForm:{
           name:{
               elementType: 'input',
               elementConfig:{
                   type:'text',
                   placeholder:'Your Name'
               },
               value: '',
               validation:{
                   required:true
               },
               valid:false,
               touched:false
           },
           street:{
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder:'Street'
            },
            value: '',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
           zipCode:{
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder:'Zip Code'
            },
            value: '',
            validation:{
                required:true,
                minLength:5,
                maxLength:6
            },
            valid:false,
            touched:false
        },
           country:{
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder:'Country'
            },
            value: '',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
           email:{
            elementType: 'input',
            elementConfig:{
                type:'email',
                placeholder:'Enter Email Address'
            },
            value: '',
               validation:{
                   required:true
               },
               valid:false,
               touched:false
        },
           deliveryMethod:{
            elementType: 'select',
            elementConfig:{
                options:[
                    {value:'fastest',displayValue: 'Fastest'},
                    {value:'cheapest',displayValue: 'Cheapest'}
                ]
            },
            value: '',
            validation:{},
            valid:true
            },
            // valid:true
            //    touched:false
        },
        loading:false,
        formIsValid:false
    }
    orderHandler =(event)=>{
        event.preventDefault();
        console.log(this.props.ingredients);
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] =this.state.orderForm[formElementIdentifier].value;
        }
        this.setState({loading:true});
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
            orderData:formData
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
     checkValidity =(value,rules)=>{
         let isValid =true;
         if(!rules){
             return true;
         }
        if(rules.required){
            isValid=value.trim() !=='' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength  && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
     }
    inputChangeHandler =(event,inputid)=>{
        const updatedOrderForm ={
            ...this.state.orderForm
        };
        const updatedFormElement={
            ...updatedOrderForm[inputid]
        };
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched=true;
        updatedOrderForm[inputid]=updatedFormElement;
        
        let formIsValid = true;
        for(let inputIdentifiers in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIdentifiers].valid && formIsValid;
        }
        
        this.setState({orderForm:updatedOrderForm,formIsValid});
    }
    render() {
        const formElementsArray =[];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form =(
            <form onSubmit={this.orderHandler}>
                    {/* <Input elementType="..." elementConfig="..." value="..."/> */}
                    {formElementsArray.map(formElement=>{
                        return <Input elementType={formElement.config.elementType}
                        key={formElement.id}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        change={(event)=>this.inputChangeHandler(event,formElement.id)}/>

                    })}
                    <Button
                     btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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
