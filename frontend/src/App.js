import './App.css';
import ArticleCard from "./components/ArticleCard";
import axios from "axios";
import {Component} from "react";
import {Grid} from "@material-ui/core";

const todoItems = [
    {
        id: 1,
        title: "Go to Market",
        description: "Buy ingredients to prepare dinner",
    },
    {
        id: 2,
        title: "Study",
        description: "Read Algebra and History textbook for the upcoming test",
    },
    {
        id: 3,
        title: "Sammy's books",
        description: "Go to library to return Sammy's books",
    },
    {
        id: 4,
        title: "Article",
        description: "Write article on how to use Django with React",
    },
    {
        id: 3,
        title: "Sammy's books",
        description: "Go to library to return Sammy's books",
    },
    {
        id: 4,
        title: "Article",
        description: "Write article on how to use Django with React",
    },
];
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
                <div className="App">
                    <Grid container spacing={2}>

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
