import React from 'react';
import classes from './Button.module.css';
const button=(props)=>{
    if(props.btnType==='Success'){
    return <button style={{margin:'10px'}} disabled={props.disabled} onClick={props.clicked} className={"btn btn-sm btn-outline-success"}>
        {props.children}
    </button>        
    }
    else if(props.btnType==='Danger'){
        return <button style={{margin:'10px'}} disabled={props.disabled} onClick={props.clicked} className={"btn btn-sm btn-outline-danger"}>
            {props.children}
        </button>        
        }
    else if(props.btnType==='Options'){
            return <button style={{margin:'10px'}} disabled={props.disabled} onClick={props.clicked} className={"btn btn-sm btn-outline-primary"}>
                {props.children}
            </button>        
            }
};
export default button;