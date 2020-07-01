import React from 'react'
import classes from './Order.module.css';

function Order(props) {

    const ingredintes = [];
    for (let ingredientName in props.ingredients){
        ingredintes.push(
            {
                name:ingredientName,
                amount:props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredintes.map(ig =>{
    return <span
             key={ig.name}
             style={{
                 textTransform:'capitalize',
                 display:'inline-block',
                 margin:'0 8px',
                 border:'1px solid #ccc',
                 padding:'5px'
             }}
             >{ig.name}({ig.amount})</span>;
    })

    return (
        <div className={classes.Order}>
          <p>Ingredients: {ingredientOutput}</p>  
    <p>Price:INR <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;
