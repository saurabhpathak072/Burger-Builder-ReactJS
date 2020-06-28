import React,{Component} from 'react';
import Modal from '../../Components/UI/Modal/Modal';

function withErrorHandler(WrappedComponent,axios) {
    return class extends Component{
        state={
            error:null
        }
        componentWillMount(){
            this.reqInterceputor=axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });
            this.resInterceputor=axios.interceptors.response.use(res=>res,error=>{
                this.setState({error});
            });
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceputor);
            axios.interceptors.response.eject(this.resInterceputor);
        }
        errorConfirmHandler =()=>{
            this.setState({error:null});
        }
        render(){
            return (
                <>
                <Modal
                 show={this.state.error}
                 modalClosed={this.errorConfirmHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}/>
                </>
            )
        }
    } 
    
}

export default withErrorHandler
