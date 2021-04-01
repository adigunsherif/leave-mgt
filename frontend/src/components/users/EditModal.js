import React, {useState, useEffect} from 'react';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import {getObjects, base_url, msg} from '../../Config';


function EditModal(props) {
    const [message, setMessage] = useState('');
    const [userdetail, setUserdetail] = useState('');

    useEffect( () => {
        getObjects(`user/${props.id}/`)
        .then(response => {
            if (response.ok) {
                return response.json()
                .then(json => setUserdetail(json))
            } else {
                return response.json()
                .then(json => setMessage(msg(json)))
                
            }
        })
        .catch(err => {
            setMessage('An error occured. Please try again.')
        })
    }, [props.id]);


    /* When the form is submitted */
    let handleSubmit = (e) => {
        e.preventDefault();
        fetch(
            `${base_url}user/${userdetail.id}/`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    staff_id: e.target.staff_id.value,
                    first_name: e.target.first_name.value,
                    last_name: e.target.last_name.value
                })
            }
        ).then((response) => {
            if (response.ok) {
                return response.json()
                .then(json => {
                    setMessage('User successfully updated.')
                    window.location.reload()
                })
            }else {
                return response.json()
                .then(json => setMessage(msg(json)))
            }
            
        })
    }

    
    return (
        <div>
            <Modal isOpen={props.status}>
                <Form onSubmit={handleSubmit}>
                    <ModalHeader toggle={props.close}>{userdetail.last_name} {userdetail.first_name}</ModalHeader>
                    <ModalBody>
                    
                        {message ? <Alert color="warning">{message}</Alert> : ''}
                    
                        <FormGroup>
                            <Label for="last_name">Last Name</Label>
                            <Input type="text" name="last_name" id="last_name" defaultValue={userdetail.last_name} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name">First Name</Label>
                            <Input type="text" name="first_name" id="first_name" defaultValue={userdetail.first_name} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="staff_id">Staff ID</Label>
                            <Input type="text" name="staff_id" id="staff_id" defaultValue={userdetail.staff_id} />
                        </FormGroup>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button color="primary" type="submit">Update</Button>
                        
                        {' '}

                        <Button color="secondary" onClick={props.close}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}


export default EditModal;