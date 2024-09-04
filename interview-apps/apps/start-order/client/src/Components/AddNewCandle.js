import React from "react";
import ".././App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { Flex, TextField, Button } from "monday-ui-react-core";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const AddNewCandle = () => {
  async function addNewCandle() {
    const payload = {
        "name": document.getElementById("name").value,
        "description": document.getElementById("description").value,
        "category": document.getElementById("category").value,
        "image_url": document.getElementById("image_url").value,
        "ingredients": document.getElementById("ingredients").value
    }
    // a POST request
    const response = await axios.post('http://localhost:8090/candles', payload)
    console.log('status:', response.status)
    alert(document.getElementById("name").value + " has been added!");
    history.push("/ManageCandlesDB")
  }

  const history = useHistory()
  const manageCandlesDB = () => {
    history.push("/ManageCandlesDB")
  }

  return (
    <>
      <Button className="Back" onClick={manageCandlesDB}>
        Back to Home
      </Button>
      <div className="App">
        <Flex gap={Flex.gaps.MEDIUM} direction={Flex.directions.COLUMN}>
          <div>
            <h1>Add New Candle</h1>
          </div>
          <div className="Text">
            <TextField id="name" placeholder="Name" title="Name" size={TextField.sizes.MEDIUM} requiredAsterisk={true} />
          </div>
          <div className="Text">
            <TextField id="description" placeholder="Description" title="Description" size={TextField.sizes.MEDIUM} requiredAsterisk={true} />
          </div>
          <div className="Text">
            <TextField id="category" placeholder="Category" title="Category" size={TextField.sizes.MEDIUM} requiredAsterisk={true} />
          </div>
          <div className="Text">
            <TextField id="image_url" placeholder="Image URL" title="Image URL" size={TextField.sizes.MEDIUM} requiredAsterisk={true} />
          </div>
          <div className="Text">
            <TextField id="ingredients" placeholder="Ingredients" title="Ingredients" size={TextField.sizes.MEDIUM} requiredAsterisk={true} />
          </div>
          <div>
            <Button onClick={addNewCandle}>
              Add Candle
            </Button>
          </div>
        </Flex>
      </div>
    </>
  );
};

export default AddNewCandle;