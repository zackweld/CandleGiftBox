import React from 'react'
import { useHistory } from "react-router-dom";
import "../App.css";
import { Flex, Button } from "monday-ui-react-core";

const Homepage = () => {
    const history = useHistory();

    const createCandlesOrder = () => {
        history.push("/CreateCandlesOrder")
    }
    const manageCandlesDB = () => {
        history.push("/ManageCandlesDB")
    }
    const viewOrdersBoard = () => {
        history.push("OrdersBoard")
    }
    return (
        <>
            <div className='App'>
                <Flex gap={Flex.gaps.LARGE} direction={Flex.directions.COLUMN}>
                <div>
                    <h1>Candle Gift Box Production Builder</h1>
                </div>
                <div>
                    <Flex gap={Flex.gaps.LARGE}>
                        <Button onClick={createCandlesOrder}>
                            Create Candles Order
                        </Button>
                        <Button onClick={manageCandlesDB}>
                            Manage Candles DB
                        </Button>
                        <Button onClick={viewOrdersBoard}>
                            View Orders Board
                        </Button>
                    </Flex>

                </div>
                </Flex>
            </div>
        </>
    );
};

export default Homepage