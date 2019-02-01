import React from 'react';
import { Route, Switch } from 'react-router-dom';
//If you want to have default component e.g.(NotFound page component),
//you have to import Switch which will render only the first found component.
//Then you have to wrap routes in <Switch></Switch>
//REMEMBER: DEFAULT ROUTE/COMPONENT HAS TO BE LAST ADDED!

//Add all components without header, footer etc..
import Home from './home/Home';
import LoginForm from './user/LoginForm';
import RegisterForm from "./user/RegisterForm";
import Account from "./user/Account";
import Logout from "./user/Logout";
import Catalog from "./tires/retrieve/Catalog";
import CreateProductForm from "./tires/create/CreateProductForm";
import Delete from "./tires/delete/Delete";
import EditProductForm from "./tires/edit/EditProductForm";
import Details from "./tires/retrieve/Details";
import Cart from "./cart/Cart";
import Orders from "./admin/Orders";

//Route with no path - used for not found pages.
const AppRouter = () => (
    <Switch>
        <Route path="/orders" component={Orders}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/details/:id" component={Details}/>
        <Route path="/edit/:id" component={EditProductForm}/>
        <Route path="/delete/:id" component={Delete}/>
        <Route path="/create" component={CreateProductForm}/>
        <Route path="/catalog" component={Catalog}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/account" component={Account}/>
        <Route path="/register" component={RegisterForm}/>
        <Route path="/login" component={LoginForm}/>
        <Route path="/" component={Home}/>
    </Switch>
);

export default AppRouter;