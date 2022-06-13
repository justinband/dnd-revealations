import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: undefined,
        };
    }

    handleFileUpload = (e) => {
        if(e.target.files && e.target.files[0]) {
            // creates a blob
            this.props.onFileUpload(URL.createObjectURL(e.target.files[0]));
            // this.props.onFileUpload(e.target.files[0]);
        }
    }

    handleClear = () => { this.props.handleClear(); }

    render () {
        return (
            <div>
                <div className="title">
                    <h1>DnD Reve(a)lations</h1>
                </div>
                <div className="options">
                    <Form.Group 
                        controlId="formFile"
                        className="mb-3"
                    >
                        <Form.Label>Choose a file...</Form.Label>
                        <Form.Control 
                            type="file"
                            onChange={this.handleFileUpload}    
                        />
                    </Form.Group>
                    <div
                        className="userOptions"
                    >
                        <Button 
                            variant="danger"
                            className="clear"
                            onClick={this.handleClear}    
                        >Clear</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;