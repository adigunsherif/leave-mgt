import React, {useState, useEffect} from 'react';
import { Table, Button} from 'reactstrap';
import Approve from './ApproveModal';
import Reject from './RejectModal';
import {getObjects} from '../../Config';


function LeaveRequest (props) {
    const [requests, setRequests] = useState([]);
    const [approvemodal, setApproveModal] = useState({stat:false, id:''});
    const [rejectmodal, setRejectModal] = useState({stat:false, id:''});

    useEffect( () => {
        getObjects('leave/')
            .then(response =>  response.json())
            .then(json => setRequests(json))
    }, []);


    const listItems = requests.map((item, index) =>
        <tr key={item.id}>
            <td>{index + 1} </td>
            <td>{item.user} </td>
            <td>{item.fullname} </td>
            <td>{item.type_of_leave} </td>
            <td>{item.start_date} </td>
            <td>{item.end_date} </td>
            <td>{item.resumption_date} </td>
            <td>{item.initial_balance} days </td>
            <td>{item.after_balance} days </td>
            <td>{item.date_approved} </td>
            <td>{item.status} </td>
    
            <td>
                <Button 
                    color="success" onClick={
                        () => setApproveModal({stat:true, id:item.id})
                    }>
                    Approve
                </Button> 

                {' '}

                <Button color="danger" onClick={
                    () => setRejectModal({stat:true, id:item.id})
                }>
                    Reject
                </Button>
            </td>
        </tr>
    );

    return (

        <div className="container mt-3">
            <h3 className="mb-4">
                Leave Requests History
                
            </h3>

            <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Staff ID</th>
                        <th>Name</th>
                        <th>Type of leave</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Resumption Date</th>
                        <th>Initial Balance</th>
                        <th>After Balance</th>
                        <th>Date Approved/ Rejected</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </Table>

            { (approvemodal.stat) && (<Approve id={approvemodal.id} status={approvemodal.stat} close={()=> setApproveModal(false,'')} />) }

            { (rejectmodal.stat) && (<Reject id={rejectmodal.id} status={rejectmodal.stat} close={()=> setRejectModal(false, '')} />) }

            
        </div>


    )
}

export default LeaveRequest;


