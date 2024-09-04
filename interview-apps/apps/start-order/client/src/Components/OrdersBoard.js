import React from "react";
import { useHistory } from "react-router-dom";
import {
    Flex, 
    Button, 
    Table, 
    TableHeader, 
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
    ExpandCollapse,
    Chips
 } from "monday-ui-react-core";
import "../App.css";

const OrdersBoard = () => {
    const history = useHistory();
    const homepage = () => (
        history.push("/")
    )

    const columns = [{
        id: "orderId",
        title: "Order ID",
        width: 180,
        loadingStateType: "medium-text"
    }, {
        id: "salesAssociate",
        title: "Sales Associate",
        width: 200,
        loadingStateType: "long-text"
    }, {
        id: "scentProfiles",
        title: "Scent Profiles",
        width: 400,
        loadingStateType: "medium-text"
    }];

    const orders = [{
        "orderId": 754,
        "salesAssociate": "Kyle",
        "scentProfiles": [
           "Herb Garden",
           "Lavender",
           "Passion Fruit"
        ],
        "customerFirstName": "Zack",
        "customerLastName": "Weld",
        "quantity": 2,
        "status": 0,
        "id": "330801647474022869"
     },
     {
        "orderId": 800,
        "salesAssociate": "Amanda",
        "scentProfiles": [
           "Herb Garden",
           "Fall",
           "Lavender"
        ],
        "customerFirstName": "Luke",
        "customerLastName": "Smith",
        "quantity": 3,
        "status": 0,
        "id": "208677211787751624"
     },
     {
        "orderId": 678,
        "salesAssociate": "Mike",
        "scentProfiles": [
           "Fall",
           "Lavender",
           "Passion Fruit"
        ],
        "customerFirstName": "Amelia",
        "customerLastName": "Smith",
        "quantity": 4,
        "status": 1,
        "id": "715041161632745722"
     },
     {
        "orderId": 83,
        "salesAssociate": "Sarah",
        "scentProfiles": [
           "Herb Garden",
           "Fall",
           "Lavender"
        ],
        "customerFirstName": "Jessica",
        "customerLastName": "Daniels",
        "quantity": 5,
        "status": 2,
        "id": "172196510395618224"
     }];

    // Get All Orders from DB

    // async function getOrders() {
    //     return await fetch("http://localhost:8090/orders")
    // }
    // getOrders()
    // .then((response) => response.json())
    // .then((json_response) => {
    //     var count = 1
    //     json_response.forEach(order => {
    //         orders.push({
    //             id: count,
    //             orderId: order.orderId,
    //             salesAssociate: order.salesAssociate,
    //             scentProfiles: order.scentProfiles,
    //             status: order.status
    //         })
    //         count++
    //     });
    // });

    return (
        <>
            <Button className="Back" onClick={homepage}>
                Back to Home
            </Button>
            <div className="App">
                <Flex gap={Flex.gaps.LARGE} direction={Flex.directions.COLUMN}>
                    <ExpandCollapse
                        title="Open Requests"
                        defaultOpenState
                    >
                        <Table style={{
                            width: "auto"
                        }} size={Table.sizes.MEDIUM} columns={columns}>
                            <TableHeader>
                                {columns.map((headerCell, index) => 
                                    <TableHeaderCell key={index} title={headerCell.title} icon={headerCell.icon} infoContent={headerCell.infoContent} />
                                )}
                            </TableHeader>
                            <TableBody>
                                {orders.filter(element => element.status === 0).map(order =>
                                    <TableRow key={order.id}>
                                        <TableCell>{order.orderId}</TableCell>
                                        <TableCell>{order.salesAssociate}</TableCell>
                                        <TableCell>{order.scentProfiles.map(scent => 
                                            <Chips label={scent} readOnly/>)}</TableCell>
                                    </TableRow>    
                                )}
                            </TableBody>
                        </Table>
                    </ExpandCollapse>
                    <ExpandCollapse
                        title="Working On It"
                        defaultOpenState
                    >
                        <Table style={{
                            width: "auto"
                        }} size={Table.sizes.MEDIUM} columns={columns}>
                            <TableHeader>
                                {columns.map((headerCell, index) => 
                                    <TableHeaderCell key={index} title={headerCell.title} icon={headerCell.icon} infoContent={headerCell.infoContent} />
                                )}
                            </TableHeader>
                            <TableBody>
                                {orders.filter(element => element.status === 1).map(order =>
                                    <TableRow key={order.id}>
                                        <TableCell>{order.orderId}</TableCell>
                                        <TableCell>{order.salesAssociate}</TableCell>
                                        <TableCell>{order.scentProfiles.map(scent => 
                                            <Chips label={scent} readOnly/>)}</TableCell>
                                    </TableRow>    
                                )}
                            </TableBody>
                        </Table>
                    </ExpandCollapse>
                    <ExpandCollapse
                        title="Done"
                        defaultOpenState
                    >
                        <Table style={{
                            width: "auto"
                        }} size={Table.sizes.MEDIUM} columns={columns}>
                            <TableHeader>
                                {columns.map((headerCell, index) => 
                                    <TableHeaderCell key={index} title={headerCell.title} icon={headerCell.icon} infoContent={headerCell.infoContent} />
                                )}
                            </TableHeader>
                            <TableBody>
                                {orders.filter(element => element.status === 2).map(order =>
                                    <TableRow key={order.id}>
                                        <TableCell>{order.orderId}</TableCell>
                                        <TableCell>{order.salesAssociate}</TableCell>
                                        <TableCell>{order.scentProfiles.map(scent => 
                                            <Chips label={scent} readOnly/>)}</TableCell>
                                    </TableRow>    
                                )}
                            </TableBody>
                        </Table>
                    </ExpandCollapse>
                </Flex>
            </div>
        </>
    );
};

export default OrdersBoard;
