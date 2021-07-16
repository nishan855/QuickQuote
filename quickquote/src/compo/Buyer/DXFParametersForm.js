import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class DXFParametersForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            comment: '',
            topic: 'three',

            userFirstName: '',
            userLastName: '',
            userComment: '',
            userTopic: '',
        }
    }

    handleFirstNameChange = (event) => {
        this.setState(
            {
                firstName: event.target.value,
            }
        )
    }

    handleLastNameChange = (event) => {
        this.setState(
            {
                lastName: event.target.value,
            }
        )
    }

    handleCommentChange = (event) => {
        this.setState(
            {
                comment: event.target.value,
            }
        )
    }

    handleTopicChange = (event) => {
        this.setState(
            {
                topic: event.target.value,
            }
        )
    }

    handleSubmit = (event) => {
        event.preventDefault();
        alert(  `${this.state.firstName}\n${this.state.lastName}\n${this.state.comments}\n${this.state.topic}`)
        this.setState(
            {

                userFirstName: this.state.firstName,
                userLastName: this.state.lastName,
                userComment: this.state.comment,
                userTopic: this.state.topic,
            }
        )
    }


    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name: </label>
                        <input type = 'text' value = {this.state.firstName} id = 'fn' onChange = {this.handleFirstNameChange}  />
                    </div>
                    <div>
                        <label>Last Name: </label>
                        <input type = 'text' value = {this.state.lastName} id = 'ln' onChange = {this.handleLastNameChange} />
                    </div>
                    <div>
                        <label>Comment: </label>
                        <textarea value={this.state.comment} id = 'cm' onChange = {this.handleCommentChange}></textarea>
                    </div>
                    <div>
                        <label>Topic </label>
                        <select value={this.state.topic} id = 'tp' onChange={this.handleTopicChange}>
                            <option value= "one">1</option>
                            <option value= "two">2</option>
                            <option value= "three">3</option>
                        </select>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
                <p>First Name: {this.state.userFirstName}</p>
                <p>Last Name: {this.state.userLastName}</p>
                <p>Comment: {this.state.userComment}</p>
                <p>Topic: {this.state.userTopic}</p>
            </>

        );
    }
}

export default DXFParametersForm