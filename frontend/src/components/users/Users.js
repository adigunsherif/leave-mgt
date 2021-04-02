import React, {useState, useEffect} from 'react';
import { Table, Button} from 'reactstrap';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import {getObjects} from '../../Config';
import NewUser from './NewUser';

function Staff(props) {
    const [staffs, setStaffs] = useState([]);
    const [editmodal, setEditModal] = useState({stat:false, id:''});
    const [deletemodal, setDeleteModal] = useState({stat:false, id:''});
    const [newuser, setNewUser] = useState(false);


    useEffect( () => {
        getObjects('user/')
            .then((response) => {
                return response.json()
                .then(json => setStaffs(json))
            })
    }, []);

    const listItems = staffs.map((item, index) =>
        <tr key={item.id}>
            <td>{index + 1} </td>
            <td>{item.first_name} </td>
            <td>{item.last_name} </td>
            <td>{item.staff_id} </td>
            <td>{item.leave_balance} days </td>
            <td>
                <Button 
                    color="success" onClick={
                        () => setEditModal({stat:true, id:item.id})
                    }>
                    Edit <span className="fa fa-edit"></span>
                </Button> 

                {' '}

                <Button color="danger" onClick={
                    () => setDeleteModal({stat:true, id:item.id})
                }>
                    Delete <span className="fa fa-close"></span>
                </Button>
            </td>
        </tr>
    );


    return (
        <div className="container mt-3">
            <h3>
                Manage Staff 
                <Button color="success" className="float-right" onClick={()=> setNewUser(true)}>
                    Add new Staff <span className="fa fa-plus"></span>
                </Button> 
            </h3>


            <Table bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Leave Balance</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </Table>

            { (editmodal.stat) && (<EditModal id={editmodal.id} status={editmodal.stat} close={()=> setEditModal(false,'')} />) }

            { (deletemodal.stat) && (<DeleteModal id={deletemodal.id} status={deletemodal.stat} close={()=> setDeleteModal(false, '')} />) }

            { newuser && (
                <NewUser status={newuser} close={()=> setNewUser(false)} />
            )}
            
        </div>
    )
}


export default Staff;