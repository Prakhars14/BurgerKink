import React from 'react';
import Aux from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';
const orderSummary=(props)=>{
    const ingredientSummary=Object.keys(props.ingredients).map(igKey=>{
    return (
        <li key={igKey}>
            <span style={{textTransform:'capitalize'}}>{igKey}</span>
            :{props.ingredients[igKey]} 
        </li>)
    })
    return(
        <Aux>
            <h3>Order Order</h3>
            <p>Enjoy your happy meal :p</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
            <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continuation}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;