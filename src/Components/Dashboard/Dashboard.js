import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
    state = {
        petNameInput: '',
        petColorInput: '',
        petBreedInput: '',
        ownerSelected: ''
    }
    handleSubmit = () => {
        console.log('Add pet Submit button clicked');
    }
    handleInputChange = (typeOf, value) => {
        this.setState({
            [typeOf]: value
        })
    }
    render() {
        return (
            <div className="dashboard">
                <div className="addPetheader">
                    <div>
                        Add Pet
                    </div>
                    <div className="inputWrapper">
                        <input 
                            placeholder="Pet Name" 
                            onChange={(event)=>{this.handleInputChange('petNameInput', event.target.value)}}/>
                        <input 
                            placeholder="Pet Color" 
                            onChange={(event)=>{this.handleInputChange('petColorInput', event.target.value)}}/>
                        <input 
                            placeholder="Pet Breed" 
                            onChange={(event)=>{this.handleInputChange('petBreedInput', event.target.value)}}/>
                        
                        {this.props.reduxState.ownerReducer &&
                            <select
                                classname="ownerNameOptions"
                                onChange={(event)=>{this.handleInputChange('ownerSelected', event.target.value)}}
                                >
                                {this.props.reduxState.ownerReducer.map((owner) => (
                                    <option value={owner.id}>{owner.name}</option>
                                ))}
                            </select>                        
                        }
                        <button onClick={this.handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
                <table className="historyTable">
                        <thead>
                            <tr>
                                <th>
                                    Owner
                                </th>
                                <th>
                                    Pet
                                </th>
                                <th>
                                    Breed
                                </th>
                                <th>
                                    Color
                                </th>
                                <th>
                                    Checked In
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.reduxState.petReducer &&
                        <>
                            {this.props.reduxState.petReducer.map((pet) => (
                                <tr>
                                    <td>{pet.ownerName}</td>
                                    <td>{pet.petName}</td>
                                    <td>{pet.breed}</td>
                                    <td>{pet.color}</td>
                                    <td>{pet.checkedIn}</td>
                                    <td><button onClick={this.handleDelete}>Delete</button></td>
                                </tr>
                            ))}
                        </>
                        }
                        </tbody>
                    </table>
                 
            </div>
        )
    }
}


const mapStateToProps = (reduxState) => ({
    reduxState
})
export default connect(mapStateToProps)(Dashboard);