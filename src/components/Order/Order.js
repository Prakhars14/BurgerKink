import React from 'react';
import classes from './Order.module.css';

const order=(props)=>{
    const ingredients=[];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName, 
            amount: props.ingredients[ingredientName]
        }
        );
    }

    const ingredientOutput=ingredients.map(ig=>{
        return <span className={classes.orderrow}>
                    <span className={classes.IndivOrder} key={ig.name}>{ig.name}</span>:
                    <span className={classes.orderamt}>{ig.amount}</span>
            </span>;
    })
    return(
    <div className={classes.Order}>
        <p>Ingredients: </p>
        {ingredientOutput}
        <p>Price: {Number.parseFloat(props.price).toFixed(2)}</p>
    </div>
    )
};

export default order;