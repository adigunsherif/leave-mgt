import React, {useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { base_url, getObjects, token, msg} from '../../Config';


function Reject(props) {
    const [message, setMessage] = useState('');
    const [leave, setLeave] = useState({});

    useEffect( () => {
        getObjects(`leave/${props.id}/`)
            .then(res => res.json())
            .then(json => setLeave(json))
    }, [props.id])


    /* When the form is submitted */
    let rejectleave = () => {
        fetch(
            `${base_url}leave/${leave.id}/`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type':  'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    status:'rejected'
                })
            }
        ).then((response) => {
            if(response.ok) {
                return response.json()
                .then(json => {
                    window.location.reload()
                })
            } else{
                return response.json()
                .then(json => setMessage(msg(json)))
            }
            
        }).catch(err => {
            setMessage('An error occured. Please try again.')
        })
        
    }

    
    return (
        <div>
            <Modal isOpen={props.status}>
                <ModalHeader toggle={props.close}>Reject leave between {leave.start_date} - {leave.end_date}</ModalHeader>
                <ModalBody>

                    {message ? <Alert color="warning">{message}</Alert> : ''}

                    {
                    (leave !== '') ?
                        (<Alert color="danger">
                            <h4>Are you sure you want to reject <em>{leave.type_of_leave}</em> request by <em>{leave.fullname}</em>?</h4>
                            <br />
                        </Alert>)

                    :
                        (<Alert color="info">No leave loaded</Alert>)

                    }
                </ModalBody>
                
                <ModalFooter>
                    <Button color="danger" onClick={rejectleave}>Yes, reject</Button>
                    
                    {' '}

                    <Button color="secondary" onClick={props.close}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}


export default Reject;