import React, {useState, useEffect} from 'react';
import { Table, Button} from 'reactstrap';
import NewRequest from './leave/NewRequest';
import {getObjects, uid} from '../Config';


function StaffDashboard (props) {
    const [user, setUser] = useState()
    const [requests, setRequests] = useState([]);
    const [newrequest, setNewRequest] = useState(false);

    useEffect( () => {
        
        //GET USER
        getObjects(`user/${uid}/`)
            .then((response) => {
                return response.json()
                .then(json => setUser(`${json.last_name} ${json.first_name}`))
            })

        //GET LEAVES
        getObjects(`leave/?user_id=${uid}`)
            .then(response => {
                return response.json()
                .then(json =>setRequests(json))    
            })
        
    }, []);


    const listItems = requests.map((item, index) =>
        <tr key={item.id}>
            <td>{index + 1} </td>
            <td>{item.type_of_leave} </td>
            <td>{item.start_date} </td>
            <td>{item.end_date} </td>
            <td>{item.resumption_date} </td>
            <td>{item.initial_balance} days </td>
            <td>{item.after_balance} days </td>
            <td>{item.status}</td>
            <td>{item.date_approved}</td>
            <td></td>
        </tr>
    );

    return (

        <div className="container mt-3">
            <h3>Welcome {user}</h3>
            <h4 className="mb-4">
                Your Leave Requests History
                <Button color="success" className="float-right" onClick={()=> setNewRequest(true)}>
                    Post new request
                </Button> 
            </h4>

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Type of leave</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Resumption Date</th>
                        <th>Initial Balance</th>
                        <th>After Balance</th>
                        <th>Status</th>
                        <th>Date Approved/ Rejected</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </Table>

            { (newrequest) && (<NewRequest status={newrequest} close={()=> setNewRequest(false)} />) }

            
            
        </div>


    )
}


export default StaffDashboard;