import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import Header from './Header';
import Staff from './users/Users';
import LeaveRequest from './leave/LeaveRequests';
import AdminDashboard from './AdminDashboard';
import StaffDashboard from './StaffDashboard';

function Home(props) {

    
    return (
        <>
        <Router>
            <Header isadmin={props.isadmin} />
            
            <Switch>
                
                {
                    //superuser routes
                    props.isadmin 

                    ? 
                    <>
                        <Route exact path="/" component={AdminDashboard} />
                        <Route path="/staff" component={Staff} />
                        <Route path="/leave-requests" component={LeaveRequest} />
                    </>
                    : 
                    //staff routes
                    <>
                        <Route exact path="/" component={StaffDashboard}/>
                    </>
                }
                
                
            </Switch>
        </Router>
        </>
    )

}


export default Home;