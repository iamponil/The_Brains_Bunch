// import React, { Component } from 'react';
// import '../pages/Payment.css'
// class MyComponent extends Component {

//   handleClick = (e) => {
//     const selected = e.target.parentNode.parentNode.parentNode;
//     selected.classList.toggle('highlight');
//   }

//   render() {
//     return (
//       <div id="wrapper">
//         <div className="row">
//           <div className="col-xs-5">
//             <div id="cards">
//               <img src="http://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Visa-icon.png" />
//               <img src="http://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Master-Card-icon.png" />
//             </div>
//             <div className="form-check">
//               <label className="form-check-label" htmlFor="card">
//                 <input id="card" className="form-check-input" type="checkbox" onClick={this.handleClick} />
//                 Pay with credit card
//               </label>
//             </div>
//           </div>
//           <div className="col-xs-5">
//             <div id="cards">
//               <img src="http://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Paypal-icon.png" />
//             </div>
//             <div className="form-check">
//               <label className="form-check-label" htmlFor="paypal">
//                 <input id="paypal" className="form-check-input" type="checkbox" onClick={this.handleClick} />
//                 Pay with PayPal
//               </label>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-xs-5">
//             <i className="fa fa fa-user"></i>
//             <label htmlFor="cardholder">Cardholder's Name</label>
//             <input type="text" id="cardholder" />
//           </div>
//           <div className="col-xs-5">
//             <i className="fa fa-credit-card-alt"></i>
//             <label htmlFor="cardnumber">Card Number</label>
//             <input type="text" id="cardnumber" />
//           </div>
//         </div>
//         <div className="row row-three">
//           <div className="col-xs-2">
//             <i className="fa fa-calendar"></i>
//             <label htmlFor="date">Valid thru</label>
//             <input type="text" placeholder="MM/YY" id="date" />
//           </div>
//           <div className="col-xs-2">
//             <i className="fa fa-lock"></i>
//             <label htmlFor="date">CVV / CVC *</label>
//             <input type="text" />
//           </div>
//           <div className="col-xs-5">
//             <span className="small">* CVV or CVC is the card security code, unique three digits number on the back of your card seperate from its number.</span>
//           </div>
//         </div>
//         <footer>
//           <button className="btn">Back</button>
//           <button className="btn">Next Step</button>
//         </footer>
//       </div>
//     );
//   }
// }

// export default MyComponent;
import React, { Component } from 'react';
import '../pages/Payment.css'

class MyComponent extends Component {
handleClick = (e) => {
const selected = e.target.parentNode.parentNode.parentNode;
selected.classList.toggle('highlight');
}

handleSubmit = (e) => {
e.preventDefault();
// code de traitement de formulaire ici
}

render() {
return (
<div id="wrapper">
<form onSubmit={this.handleSubmit}>
<div className="row">
<div className="col-xs-5">
<div id="cards">
<img src="http://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Visa-icon.png" />
<img src="http://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Master-Card-icon.png" />
</div>
<div className="form-check">
<label className="form-check-label" htmlFor="card">
<input id="card" className="form-check-input" type="checkbox" onClick={this.handleClick} />
Pay with credit card
</label>
</div>
</div>
<div className="col-xs-5">
<div id="cards">
<img src="http://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/Paypal-icon.png" />
</div>
<div className="form-check">
<label className="form-check-label" htmlFor="paypal">
<input id="paypal" className="form-check-input" type="checkbox" onClick={this.handleClick} />
Pay with PayPal
</label>
</div>
</div>
</div>
<div className="row">
<div className="col-xs-5">
<i className="fa fa fa-user"></i>
<label htmlFor="cardholder">Cardholder's Name</label>
<input type="text" id="cardholder" name="cardholder" required maxLength="50" />
</div>
<div className="col-xs-5">
<i className="fa fa-credit-card-alt"></i>
<label htmlFor="cardnumber">Card Number</label>
<input type="text" id="cardnumber" name="cardnumber" required pattern="[0-9]{13,16}" />
</div>
</div>
<div className="row row-three">
<div className="col-xs-2">
<i className="fa fa-calendar"></i>
<label htmlFor="date">Valid thru</label>
<input type="text" placeholder="MM/YY" id="date" name="date" required pattern="(0[1-9]|1[0-2])\/[0-9]{2}" />
</div>
<div className="col-xs-2">
<i className="fa fa-lock"></i>
<label htmlFor="cvv">CVV</label>
<input type="text" id="cvv" name="cvv" required pattern="[0-9]{3,4}" />

</div>
<div className="col-xs-2">
<i className="fa fa-money"></i>
<label htmlFor="amount">Amount</label>
<input type="text" id="amount" name="amount" required pattern="[0-9]+" />
</div>
</div>
<footer>
           <button className="btn">Back</button>
          <button className="btn">Next Step</button>
        </footer>


</form>
</div>
);
}
}
export default MyComponent;





