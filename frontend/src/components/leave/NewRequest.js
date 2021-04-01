import React, {useState} from 'react';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import {base_url, token, uid} from '../../Config';


function NewRequest(props) {
    const [message, setMessage] = useState('');


    /* When the form is submitted */
    let handleSubmit = (e) => {
        e.preventDefault();
        fetch(
            `${base_url}leave/`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    "user": uid,
                    "type_of_leave": e.target.type_of_leave.value,
                    "start_date": e.target.start_date.value,
                    "resumption_date": e.target.resumption_date.value,
                    "end_date": e.target.end_date.value,
                })
            }
        ).then(response => {
            if (response.ok) {
                setMessage('Request successfully sent.')
                window.location.reload()
            } else {
                response.json().then(json => {
                    var msg = '';
                    for (let key in json) {
                        msg += json[key].join()
                    }
                    setMessage(msg)
                })
                
            }
        })
        .catch(err => {
            setMessage('An error occured. Please try again.')
        })
    }

    
    return (
        <div>
            <Modal isOpen={props.status}>
                <Form onSubmit={handleSubmit}>
                    <ModalHeader toggle={props.close}>Post new request</ModalHeader>
                    <ModalBody>
                    
                        {message ? <Alert color="warning">{message}</Alert> : ''}

                        <FormGroup>
                            <Label for="type_of_leave">Type of leave</Label>
                            <Input type="select" name="type_of_leave" id="type_of_leave" required >
                                <option value="sick_leave">Sick Leave</option>
                                <option value="exam_leave">Exam Leave</option>
                                <option value="annual_leave">Annual Leave</option>
                                <option value="compassionate_leave">Compassionate Leave</option>
                            </Input>
                        </FormGroup>
                    
                        <FormGroup>
                            <Label for="start_date">Start Date</Label>
                            <Input type="date" name="start_date" id="start_date" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="end_date">End Date</Label>
                            <Input type="date" name="end_date" id="end_date" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="resumption_date">Resumption Date</Label>
                            <Input type="date" name="resumption_date" id="resumption_date" required />
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


export default NewRequest;