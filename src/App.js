import { AddUsers } from "./pages/addUsers";
import Loading from "./component/loading";
import { useState, useEffect } from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []); 

    return (
        <div className="App">
            {loading ? 
                <Loading/>
                : 
                <div>
                    <AddUsers/>
                </div>
            }
        </div>
    );
}

export default App;
