import React from 'react';
import Button from '../../UI/Button/Button';


function OrderSummary(props) {
    const ingredientSummary = Object.keys( props.ingredients).map((igKeys)=>{
    return <li key={igKeys}><span style={{textTransform:'capitalize'}}>{igKeys}</span>:{props.ingredients[igKeys]}</li>
    });
    return (
        <>
          <h3>Your Order</h3>
          <p>A delicious burger with the followin ingredients:</p>  
          <ul>
            {ingredientSummary}
          </ul>
        <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
          <p>continue to checkout?</p>
          <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
          <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
        </>
    )
};

export default OrderSummary
