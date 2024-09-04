import React from "react";
import { useState } from "react";
import ".././App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import { Flex, Dropdown, TextField, Button } from "monday-ui-react-core";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const CreateCandlesOrder = () => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const options = []
  const data = [
    {
      "name": "Herb Garden",
      "description": "A refreshing fragrance that captures the essence of an aromatic herb garden.",
      "category": "Herbaceous",
      "image_url": "https://example.com/herb_garden.jpg",
      "ingredients": "Mint, Parsley, Ginger, Pine",
      "created_at": "2024-09-04 12:11:27.355236",
      "updated_at": "2024-09-04 12:11:27.355311",
      "id": "326057110543017294"
   },
   {
      "name": "Fall",
      "description": "A crisp fragrance that captures the essence of Autumn.",
      "category": "Seasonal",
      "image_url": "https://example.com/fall.jpg",
      "ingredients": "Pumpkin, Pine, Cinnamon",
      "created_at": "2024-09-04 12:22:28.233017",
      "updated_at": "2024-09-04 12:22:28.233051",
      "id": "835664449552979955"
   },
   {
      "name": "Lavender",
      "description": "A calming floral scent.",
      "category": "Floral",
      "image_url": "https://example.com/lavender.jpg",
      "ingredients": "English lavender leaves, Flower stems",
      "created_at": "2024-09-04 12:23:00.496667",
      "updated_at": "2024-09-04 12:23:00.496681",
      "id": "267347524282015785"
   },
   {
      "name": "Passion Fruit",
      "description": "Juicy and sweet with notes of tart citrus and sea salt.",
      "category": "Fruity",
      "image_url": "https://example.com/passion-fruit.jpg",
      "ingredients": "Pomegranate, Natural Oils",
      "created_at": "2024-09-04 12:23:44.800065",
      "updated_at": "2024-09-04 14:41:39.929951",
      "id": "259645882216931523"
   }
  ]

  function fillDropdown() {
    for(let i = 0; i < data.length; i++) {
      options.push({value: i, label: data[i].name})
    }
  }
  fillDropdown()

  // Get All Candles from API - Issues trying to parse response call

  // async function getCandles() {
  //   return await fetch("http://localhost:8090/candles")
  // }
  // getCandles()
  // .then((response) => response.json())
  // .then((candles) => {
  //   candles.forEach(candle => {
  //     options.push({value: candle.name, label: candle.name})
  //   });
  // });

  const history = useHistory()
  const homepage = () => {
    history.push("/")
  }

  function onButtonClick() {
    submitOrder()
    alert("Candle Box Created for " + document.getElementById("firstName").value + "!");
  }

  const handleChange = (e) => {
    setSelectedOptions(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  async function submitOrder() {
    const scents = []
    selectedOptions.forEach(option => {
      scents.push(data[option].name)
    });
    const payload = {
      "orderId": Math.floor(Math.random() * 1000) + 1,
      "salesAssociate": "Kyle",
      "scentProfiles": scents,
      "customerFirstName": document.getElementById("firstName").value,
      "customerLastName": document.getElementById("lastName").value,
      "quantity": Number(document.getElementById("quantity").value),
      "status": 0
    }

    // a POST request
    const response = await axios.post('http://localhost:8090/orders', payload)
    console.log('status:', response.status)
    history.push("/")
  }

  console.log(selectedOptions.length)
  return (
    <>
      <Button className="Back" onClick={homepage}>
        Back to Home
      </Button>
      <div className="App">
        <Flex gap={Flex.gaps.MEDIUM} direction={Flex.directions.COLUMN}>
          <div>
            <h1>Create your Candle Gift Box</h1>
          </div>
          <div 
            style={{
              width: "700px"
            }}
          >
            <Flex gap={Flex.gaps.SMALL}>
              <TextField id="firstName" placeholder="First Name" title="First Name" size={TextField.sizes.MEDIUM} requiredAsterisk={true} />
              <TextField id="lastName" placeholder="Last Name" title="Last Name" size={TextField.sizes.MEDIUM} requiredAsterisk={true} />
              <TextField id="quantity" placeholder="Quantity" title="Quantity" size={TextField.sizes.MEDIUM} requiredAsterisk={true} />
            </Flex>
          </div>
          <div 
            style={{
              width: "700px"
            }}
          >
            <Dropdown
              id="dropdown"
              placeholder="Choose 3 Candles"
              value={options.filter(obj => selectedOptions.includes(obj.value))} // set selected values
              options={options}
              multi
              onChange={handleChange}
            />
          </div>
          <div>
            {selectedOptions.length == 3 ? (
              <Button onClick={onButtonClick} disabled={false}>
                Start Order
              </Button>
            ) : (
              <Button onClick={onButtonClick} disabled={true}>
                Start Order
              </Button>
            )}
          </div>
        </Flex>
      </div>
    </>
  );
};

export default CreateCandlesOrder;
