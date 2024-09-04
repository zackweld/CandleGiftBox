import React from 'react'
import { useHistory } from "react-router-dom";
import "../App.css";
import { Flex, Button } from "monday-ui-react-core";

const ManageCandlesDB = () => {
    const history = useHistory();

    const homepage = () => {
        history.push("/")
    }
    const addNewCandle = () => {
        history.push("/ManageCandlesDB/AddNewCandle")
    }
    return (
        <>
            <Button className="Back" onClick={homepage}>
                Back to Home
            </Button>
            <div className='App'>
                <Flex gap={Flex.gaps.MEDIUM} direction={Flex.directions.COLUMN}>
                    <div>
                        <h1>Candles DB Manager</h1>
                    </div>
                    <Flex gap={Flex.gaps.LARGE}>
                        <Button onClick={addNewCandle}>
                            Add new Candle
                        </Button>
                        <Button>
                            See All Candles
                        </Button>
                        <Button>
                            Remove Candle
                        </Button>
                    </Flex>
                </Flex>
            </div>
        </>
    );
};

export default ManageCandlesDB