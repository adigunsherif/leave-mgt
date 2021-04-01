import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';
import {getObjects, uid} from '../Config';

function AdminDashboard () {
    const [user, setUser] = useState()

    useEffect(() => {
        getObjects(`user/${uid}/`)
            .then((response) => {
                return response.json()
                .then(json => setUser(`${json.last_name} ${json.first_name}`))
            })
    }, [])


    return (
        <Container className="mt-3">
            <h3>Welcome {user}</h3>

            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h4"> Request History</CardTitle>
                            <CardText>Manage Leave Requests </CardText>
                        </CardBody>
                        <CardFooter>
                            <Link to="/leave-requests">Leave Requests</Link>
                        </CardFooter>
                    </Card>
                </Col>
                
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h4"> Manage Staff</CardTitle>
                            <CardText>Manage staff records</CardText>
                        </CardBody>
                        <CardFooter>
                            <Link to="/staff">Go to page</Link>
                        </CardFooter>
                    </Card>
                </Col>

            </Row>
            
        </Container>

    )

        
}

export default AdminDashboard;