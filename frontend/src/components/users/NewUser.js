import React, {useState} from 'react';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import {base_url, token} from '../../Config';


function NewUser(props) {
    const [message, setMessage] = useState('');


    /* When the form is submitted */
    let handleSubmit = (e) => {
        e.preventDefault();
        fetch(
            `${base_url}user/`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    staff_id: e.target.staff_id.value,
                    first_name: e.target.first_name.value,
                    last_name: e.target.last_name.value,
                    password: e.target.password.value
                })
            }
        ).then((response) => {
            if (response.ok) {
                return response.json()
                .then(json => {
                    setMessage('User successfully added.')
                    window.location.reload()
                })
            }else {
                setMessage('An error occured. Please try again.')
            }
            
        })
    }

    
    return (
        <div>
            <Modal isOpen={props.status}>
                <Form onSubmit={handleSubmit}>
                    <ModalHeader toggle={props.close}>Add new user</ModalHeader>
                    <ModalBody>
                    
                        {message ? <Alert color="warning">{message}</Alert> : ''}

                        <FormGroup>
                            <Label for="staff_id">Staff ID</Label>
                            <Input type="text" name="staff_id" id="staff_id" required />
                        </FormGroup>
                    
                        <FormGroup>
                            <Label for="last_name">Last Name</Label>
                            <Input type="text" name="last_name" id="last_name" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name">First Name</Label>
                            <Input type="text" name="first_name" id="first_name" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name">Password</Label>
                            <Input type="text" name="password" id="password" required />
                        </FormGroup>
                        
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button color="primary" type="submit">Create</Button>
                        
                        {' '}

                        <Button color="secondary" onClick={props.close}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}


export default NewUser;