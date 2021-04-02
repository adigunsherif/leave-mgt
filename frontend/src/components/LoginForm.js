import React, {useState} from 'react';
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {base_url} from '../Config';
import Loader from './Loader';


/* Login Form component */
function LoginForm () {
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)


    let handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
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
        
            
        }).then(()=>setLoading(false))
        .catch(() => setMessage('An error occured. Please try again'))
    }

   
    return (
        <div className="full-height">
            
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-sm-6 mx-auto box p-4 text-white">
                        <div className="mb-3 text-center">
                            <img src={`${process.env.PUBLIC_URL}/egbinlogo.png`} alt="Logo" />
                            <h3>Leave Mgt. System</h3>
                        </div>
                        

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

                            <div className="text-center">
                                <Button type="submit" color="success" >Login</Button> {loading && <Loader />}
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginForm;
