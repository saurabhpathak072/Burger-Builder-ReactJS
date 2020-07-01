import React from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Orders from './Containers/Orders/Orders';
import Checkout from './Containers/Checkout/Checkout';

function App() {
  return (
     <Layout>
       <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/" exact component={BurgerBuilder} />
        
       </Switch>
        {/* <BurgerBuilder/>
        <Checkout /> */}
      </Layout>
  );
}

export default App;
