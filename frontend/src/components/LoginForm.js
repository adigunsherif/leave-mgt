import React, {useState} from 'react';
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {base_url} from '../Config';


/* Login Form component */
function LoginForm () {
    const [message, setMessage] = useState('')


    let handleSubmit = (e) => {
        e.preventDefault();
        let staff_id = e.target.staff_id.value;
        let pass = e.target.password.value;
        fetch(
            `${base_url}user/login/`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({staff_id:staff_id, password: pass})
            }
        ).then((response) => {
            if (response.ok) {
                return response.json()
                .then(json => {
                    /* console.log(json) */
                    localStorage.setItem('token', json.token);
                    localStorage.setItem('isadmin', json.is_superuser);
                    localStorage.setItem('uid', json.uid);
                    window.location.reload()
                })
            }else {
                setMessage('Invalid Staff ID or Password')
            }
            
        })
    }

   
    return (
        <div className="container">
            <div className="mx-auto box text-center p-4">

                <h3 className="mb-3">Leave Mgt. System</h3>

                {message ? <Alert color="warning">{message}</Alert> : ''}

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="staff_id">Staff ID</Label>
                        <Input type="text" name="staff_id" id="staff_id" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" required/>
                    </FormGroup>

                    <Button type="submit" color="success">Login</Button>
                </Form>
            </div>
            
        </div>
    )
}


export default LoginForm;
