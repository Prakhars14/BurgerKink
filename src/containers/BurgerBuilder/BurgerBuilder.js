import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
    state={
        purchasing:false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchase(ingredients){
        const sum=Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum>0;
    }

    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});            
        } else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }

    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler=()=>{
        // alert("You Continued gg!")
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo={
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <= 0;
        }
        let orderSummary=null;
        let burger = <Spinner/>;

        if(this.props.ings){
        burger=(
            <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disbled={disabledInfo}
                    purchasable={this.updatePurchase(this.props.ings)}
                    price={this.props.price}
                    isAuth={this.props.isAuthenticated}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
        orderSummary=<OrderSummary 
            ingredients={this.props.ings}
            cancelled={this.purchaseCancelHandler} 
            continuation={this.purchaseContinueHandler}
            price={this.props.price} />
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token!==null
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));