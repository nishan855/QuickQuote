import React from 'react';


class DXFParametersForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
         fullName: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state
        console.log("Final data is",data)
    }

    handleInputChange = (event) => {
        event.preventDefault()
        // console.log(event);
        // console.log(event.target.fullName)
        // console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {fullName} = this.state;
        return (
            <>
                <h1>Full Name: {fullName}</h1>
                <form>
                    <p>Enter your name: <input type = 'text' value ={fullName} placholder = 'Your Name' name='fullName' onChange={this.handleInputChange} /></p>
                    <p><button>Submit</button></p>
                    <p>Need to figure out how to store data from this form</p>

                </form>
            </>

        );
    }
}

export default DXFParametersForm