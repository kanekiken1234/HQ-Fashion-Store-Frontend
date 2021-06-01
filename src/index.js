import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { NumItemsProvider, LoggedInProvider, CurrentUserProvider, CartProvider, TotalCostProvider } from "./Components/context";

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <LoggedInProvider>
        <CurrentUserProvider>
          <CartProvider>
            <NumItemsProvider>
              <TotalCostProvider>
                <App />
              </TotalCostProvider>
            </NumItemsProvider>
          </CartProvider>
        </CurrentUserProvider>
      </LoggedInProvider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
