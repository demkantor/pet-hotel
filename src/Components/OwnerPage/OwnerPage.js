import React, { Component } from 'react';
import { connect } from 'react-redux';

class OwnerPage extends Component {

    owner = (event) => {
        this.setState({
            owner: event.target.value
        })
    }

    handleDelete = (id) => {
        this.props.dispatch({
            type: "DELETE_OWNER",
            payload: id
        })
    }

    handleSubmit = () => {
        let newOwner = {
            ownerName: this.state.owner
        }
        this.props.dispatch({
            type: "NEW_OWNER",
            payload: newOwner
        })
        // this.props.dispatch({
        //     type: "NEW_OWNER",
        //     payload: newOwner
        // })
    }

    render() {
        return (
            <>
                <div className='owner'>
                    <h1>Add Owner</h1>
                    <input placeholder="Owner Name" onChange={(event) => this.owner(event)}/> 
                    <button className="nav-link" onClick={this.handleSubmit}>Submit</button>
                </div>
                <div>
                    <h1>Owners</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    No of Pets
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.reduxState.ownerReducer.map((owner) => (
                                <tr key={owner.id}>
                                    <td>{owner.name}</td>
                                    <td>{owner.petnum}</td>
                                    <td><button onClick={() => this.handleDelete(owner.id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
})
export default connect(mapStateToProps)(OwnerPage);