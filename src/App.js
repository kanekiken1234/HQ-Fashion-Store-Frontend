import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Content from './Components/Content/Content';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { common } from '@material-ui/core/colors';
import { Route, Switch, Redirect } from "react-router-dom";
import Mens from './Components/MensCollection/Mens';
import Womens from './Components/WomensCollection/Womens';
import SignIn from './Components/Content/Login';
import Signup from './Components/Content/SignUp';
import ProductPage from './Components/Content/ProductPage';
import CartView from './Components/CheckOutComponents/CartItems';
import PaypalCheckout from './Components/CheckOutComponents/PaypalCHeckout';
import Review from "./Components/CheckOutComponents/Review";
import { CurrentUser, Cart, NumItems, LoggedIn } from "./Components/context";
import axios from "./axios";
import InstantCheckout from './Components/CheckOutComponents/BuyNowCheckout';
import Profile from './Components/Content/Profile';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: common.white,
    },
    secondary: {
      main: common.black
    }
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 800,
    h6: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em"
    },
    h2: {
      fontWeight: 500,
      fontSize: "3.75rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em"
    },
  },
  breakpoints: {
    keys: ["sm"],
    values: {
      sm: 950
    }
  }
})


function App() {
  const [render, setRender] = useState(0);
  const { setUserEmail, setUserName } = useContext(CurrentUser);
  const { setCart } = useContext(Cart);
  const { setItems } = useContext(NumItems);
  const { logged, setLogged } = useContext(LoggedIn);

  useEffect(async () => {
    const accessToken = window.localStorage.getItem("accessToken")
    let totalItems = 0
    if (accessToken) {
      const user = await axios.post('/login/auth', {
        "accessToken": accessToken
      })
      if (user) {
        const cart = await axios.post('/fetchCart', {
          "email": user.data.email
        });
        console.log(cart)
        if (cart.data.length > 0) {
          cart.data.forEach(item => {
            totalItems = totalItems + item.qty
          });
        }
        setLogged(true)
        setCart(cart.data);
        setItems(totalItems)
        setUserEmail(user.data.email)
        setUserName(user.data.firstname)
      }
    }
    else return;
  }, [render])

  const handlerender = (value) => {
    setRender(value);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/mens" exact component={Mens} />
          <Route path="/womens" exact component={Womens} />
          <Route path="/login" exact component={() => <SignIn render={(v) => handlerender(v)} />} />
          <Route path="/signup" exact component={Signup} />
          {!logged && <Redirect from='/checkout' to='/' />}
          <Route path="/checkout" exact component={CartView} />
          <Route path="/productPage" exact component={ProductPage} />
          {!logged && <Redirect from='/payment' to='/' />}
          <Route path="/payment" exact component={PaypalCheckout} />
          {!logged && <Redirect from='/instantPayment' to='/' />}
          <Route path="/instantPayment" exact component={InstantCheckout} />
          {!logged && <Redirect from='/review' to='/' />}
          <Route path="/profile" exact component={Profile} />
          {!logged && <Redirect from='/profile' to='/' />}
          <Route path="/review" exact component={Review} />
          <Route path="/" exact component={Content} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
