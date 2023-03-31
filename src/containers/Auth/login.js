import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './login.scss';
import { FormattedMessage } from 'react-intl';

import {  handleLoginApi} from '../../services/userServices';
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password : '',
            isShowPassword : false,
            errorMessage: '',
        }
    }

    handleOnChangeUsername = (event) =>{
        this.setState({
            username : event.target.value
        })
        // console.log(event.target.value)
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password : event.target.value
        })
        // console.log(event.target.value)
    }
    
    handleLogin = async (event) => {
       console.log('username : '+ this.state.username)
       console.log('password: '+ this.state.password)
       this.setState({
            errorMessage : '',
       })
       try {
        let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0)
            {
                this.setState({
                    errorMessage : data.message
                })
            }

            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log(' login is success')
            }
        // let message = await check()
        console.log(data);
       } catch (error) {
        if (error.response ) {
            if (error.response.data)    
            {
                this.setState({
                    errorMessage : error.response.data.message
                })
            }
        }
       }

     
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword : !this.state.isShowPassword
        })
    }

    render() {
        return (
           <div className='login-background'>
            <div className='login-container'>
                <div className='login-content row'>

                <div className='col-12 text-login'>
                    Login
                </div>
                <div className='col-12 form-group login-input'>
                    <label>
                        Username:
                    </label>
                    <input
                    type='text' 
                    className='form-control'
                    placeholder='Enter your username ' 
                    value={this.state.username}
                    onChange= {(event)=>{this.handleOnChangeUsername(event)} }
                    
                    />


                </div>
                <div className='col-12 form-group login-input'>
                    <label>
                        Password: 
                    </label>
                    <div className='custom-password'>
                    <input
                     type={this.state.isShowPassword ? 'text' : 'password'}
                     className='form-control'
                     placeholder='Enter your password' 
                     value={this.state.password} 
                     onChange = {(event)=> {this.handleOnChangePassword(event)}}
                 
                     /> 
                     <span  onClick = {()=> {this.handleShowHidePassword()}}>
                       
                     <i class={this.state.isShowPassword ? 'fas fa-eye-slash': 'fas fa-eye'}></i>
                     </span>
                   

                    </div>
                    
                <div className='col-12' style={{color: 'red'}}>
                    {this.state.errorMessage}

                </div>

                </div>
                <div className='col-12 form-group btn'>
                <button
                 className='btn-login'
                 onClick = {(event)=> {this.handleLogin(event)}}
                 >Login</button>
                </div>
               
                <div className='col-12 form-group forgot'>
                    <span>Forgot your password?</span>
                </div>

                <div className='col-12 text-center mt-3'>
                    <span>Or Login with: </span>

                </div>
                <div className='col-12 social-login'>
                <i class="fab fa-google-plus-g google"></i>
                <i class="fab fa-facebook facebook"></i>
                </div>

                </div>                
            </div> 

           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess : (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
