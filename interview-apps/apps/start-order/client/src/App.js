import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Homepage from "./Components/Homepage";
import CreateCandlesOrder from "./Components/CreateCandlesOrder";
import ManageCandlesDB from "./Components/ManageCandlesDB";
import AddNewCandle from "./Components/AddNewCandle";
import OrdersBoard from "./Components/OrdersBoard";


// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
  const [context, setContext] = useState();

  useEffect(() => {
    // Notice this method notifies the monday platform that user gains a first value in an app.
    // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
    monday.execute("valueCreatedForUser");

    // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  //Some example what you can do with context, read more here: https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data
  const attentionBoxText = `Hello, your user_id is: ${
    context ? context.user.id : "still loading"
  }.
  Let's start building your amazing app, which will change the world!`;

  const history = useHistory();

  const createCandlesOrder = () => {
    history.push("/CreateCandlesOrder")
  }

  return (
    <div className="App">
        <Router>
            <Switch>
                <Route
                  exact
                  path="/"
                  component={Homepage}
                />

                <Route
                  exact
                  path="/CreateCandlesOrder"
                  component={CreateCandlesOrder}
                />
                <Route 
                  exact
                  path="/ManageCandlesDB"
                  component={ManageCandlesDB}
                />
                <Route 
                  exact
                  path="/ManageCandlesDB/AddNewCandle"
                  component={AddNewCandle}
                />
                <Route
                  exact
                  path="/OrdersBoard"
                  component={OrdersBoard}
                />
            </Switch>
        </Router>
    </div>
  );
};

export default App;