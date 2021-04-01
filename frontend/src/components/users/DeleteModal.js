import React, {useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import {getObjects, base_url, token} from '../../Config';


function DeleteModal(props) {
    const [message, setMessage] = useState('');
    const [userdetail, setUserdetail] = useState({});

    useEffect( () => {
        let isMounted = true;
        getObjects(`user/${props.id}/`)
        .then(response => {
            if (response.ok) {
                return response.json()
                .then(json => {
                    if (isMounted) setUserdetail(json)
                })
            } else {
                return response.json().then(json => {
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
        return () => { isMounted = false };
    }, [props.id])


    /* When the form is submitted */
    let deleteuser = () => {
        fetch(
            `${base_url}user/${userdetail.id}/`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type':  'application/json',
                    'Authorization': `Token ${token}`
                }
            }
        ).then((response) => {
            if(response.status === 204) {
                return response.json()
                .then(json => {
                    window.location.reload()
                })
            } else{
                alert('Something went wrong. Please try again ater.')
            }
            
        })
        
    }

    
    return (
        <div>
            <Modal isOpen={props.status}>
                <ModalHeader toggle={props.close}>{userdetail.last_name} {userdetail.first_name}</ModalHeader>
                <ModalBody>
                    
                    {message ? <Alert color="warning">{message}</Alert> : ''}
                    
                    {
                    (userdetail !== '') ?
                        (<Alert color="danger">
                            <h3>Are you sure you want to delete this user, {userdetail.last_name} {userdetail.first_name}?</h3>
                            <br />

                            This action cannot be undone!
                        </Alert>)

                    :
                        (<Alert color="info">No user loaded</Alert>)

                    }
                </ModalBody>
                
                <ModalFooter>
                    <Button color="danger" onClick={deleteuser}>Yes, delete</Button>
                    
                    {' '}

                    <Button color="secondary" onClick={props.close}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}


export default DeleteModal;