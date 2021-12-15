import './App.css';
import ArticleCard from "./components/ArticleCard";
import axios from "axios";
import {Component} from "react";
import {Grid} from "@material-ui/core";
import Button from '@mui/material/Button';
import AppBarCustom from "./components/AppBarCustom";
import AddButtonModal from "./components/AddButtonModal";

// import data
// display data
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("/api/articles/")
            .then((res) => this.setState({todoList: res.data}))
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <div style={{width: '100vw', height: '100vw', backgroundColor: "#D0D3D4"}}>
                <AppBarCustom />
                <div style={{marginTop:10}} className="App">
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                        <AddButtonModal/>
                        </Grid>

                        {this.state.todoList.map(object =>
                            <Grid item xs={3}>
                                <ArticleCard
                                    object={object}/>
                            </Grid>)
                        }
                    </Grid>
                </div>


            </div>
        );
    }
}

export default App;
