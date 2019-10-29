import React from "react";

import "components/Button.scss";

import classnames from 'classnames';

export default function Button(props) {
   // change color/type of class based on what button is defined in other props
   const buttonClass = classnames("button", {
      'button--confirm': props.confirm,
      'button--danger': props.danger
   })

   return (
      <button
         className={buttonClass}
         onClick={props.onClick} 
         disabled={props.disabled}>
         
         {props.children}
      </button>
   )
}
