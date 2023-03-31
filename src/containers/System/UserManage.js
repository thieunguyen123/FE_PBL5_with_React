import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import  './UserManage.scss'
import { getAllUsers } from '../../services/userServices';
import ModalUser  from './ModalUser';
class UserManage extends Component {

    constructor(props ) {
        super(props);
        this.state = {
            arrUsers : [],
            isOpenModalUser : false,
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if ( response && response.errCode === 0  ) {
            this.setState({
                arrUsers : response.users
            })
            console.log(this.state.arrUsers);
        }
    
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser : true, 
        })
    }

    toggleUserModal = ()=> {
        this.setState({
            isOpenModalUser : !this.state.isOpenModalUser
        })
    }

    render() {
        console.log(this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                />
                <div className='title text-center'>
                    MANAGE USERS WITH THIEU
                </div >
                <div className='mx-1'>
                    <button className='btn btn-primary px-2' onClick={()=>{this.handleAddNewUser()}}>
                    <i className="fas fa-plus px-2"></i>
                        Add new user</button>
                </div>

                <div className='users-table'>
                <table id="customers">
                    <tr>
                        <th>Email</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    
                        {
                            arrUsers && arrUsers.map((item , index)=>{
                                return (
                                   
                                    <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'>
                                        <i className="fas fa-pencil-alt"></i>
                                        </button>   



                                        <button className='btn-delete'>
                                        <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                    </tr>
                                   
                                   
                                )
                            })
                        }
                      
                   
                   
                </table>

                </div>
            </div>

           
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
