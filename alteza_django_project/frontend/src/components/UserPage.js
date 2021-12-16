// import './App.css';
// import ArticleCard from "./components/ArticleCard";
import axios from "axios";
import {Component} from "react";
import {Grid} from "@material-ui/core";
// import Button from '@mui/material/Button';
import AppBarCustom from "./AppBarCustom";
import UserCard from "./UserCard";
import AddButtonModal from "./AddButtonModal";
import AddUserButtonModal from "./AddUserButtonModal";

// import AddButtonModal from "./components/AddButtonModal";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("/users/")
            .then((res) => this.setState({users: res.data}))
            .catch((err) => console.log(err));
    };

    render() {
        console.log(this.state.users)

        return (
            <div style={{width: '100vw', height: '100vw', backgroundColor: "#D0D3D4"}}>
                <AppBarCustom/>

                <div style={{marginTop: 10}} className="App">
                    <Grid style={{paddingLeft:'5vw',paddingRight:'5vw'}} container spacing={2}>
                        <Grid item xs={6}>
                            <AddUserButtonModal/>
                        </Grid>

                        {this.state.users.map(object =>
                            <Grid item xs={12}>
                                <UserCard user_info={object}/>
                            </Grid>)
                        }

                    </Grid>
                </div>


            </div>
        );
    }
}

export default UserPage;