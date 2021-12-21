import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isNotFiveChars = value => value.trim().length !== 5 ;

const Checkout = (props) => {
  const [formInputValid, setFormInputValid] = useState({
      name: true,
      street: true,
      city: true,
      postalCode: true,
  })
   
  const nameInputRef = useRef() ;
  const streetInputRef = useRef() ;
  const postalCodeInputRef = useRef() ;
  const cityInputRef = useRef() ;
  


  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value ; // current is an element
    const enteredStreet = streetInputRef.current.value ;
    const enterdPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameValid = !isEmpty(enteredName);
    const streetValid = !isEmpty(enteredStreet);
    const postalCodeValid = !isNotFiveChars(enterdPostalCode);
    const cityValid = !isEmpty(enteredCity);

    setFormInputValid({
        name: nameValid,
        street: streetValid,
        city: cityValid,
        postalCode: postalCodeValid
    })

    const formIsValid = nameValid && 
                        streetValid && 
                        postalCodeValid && 
                        cityValid ;

    if (formIsValid) {
        props.onConfirm({
          name : enteredName,
          street: enteredStreet,
          city: enteredCity,
          postalCode: enterdPostalCode
        }) ;
    } else {
        return ;
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValid.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValid.name && <p>Please enter name!</p>}
      </div>
      <div className={`${classes.control} ${formInputValid.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref = {streetInputRef} />
        {!formInputValid.street && <p>Please enter street!</p>}
      </div>
      <div className={`${classes.control} ${formInputValid.postalCode ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref ={postalCodeInputRef} />
        {!formInputValid.postalCode && <p>Please enter valid postal Code!</p>}
      </div>
      <div className={`${classes.control} ${formInputValid.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref = {cityInputRef}/>
        {!formInputValid.city && <p>Please enter city!!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;