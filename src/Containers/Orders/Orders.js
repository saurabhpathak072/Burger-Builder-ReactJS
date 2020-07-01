import React, { Component } from 'react'
import Axios from 'axios';
import Order from '../../Components/Order/Order';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

 class Orders extends Component {
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        Axios.get('https://react-myburger-123.firebaseio.com/order.json')
        .then(res=>{
            const fetchedOrders =[];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                id:key});
            }
            this.setState({loading:false,orders:fetchedOrders});
        }).catch(err=>{
            console.log(err);
            this.setState({loading:false});
        });
    }
    render() {
        return (
            <div>
               {this.state.orders.map(order=>{
                  return <Order
                   key={order.id}
                   ingredients={order.ingredients}
                   price={order.price}
                   />
               })}
            </div>
        )
    }
}

export default withErrorHandler(Orders,Axios);
