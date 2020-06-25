import Axios from 'axios';
const instance=Axios.create({
    baseURL: 'https://react-myburger-123.firebaseio.com/'
});

export default instance;