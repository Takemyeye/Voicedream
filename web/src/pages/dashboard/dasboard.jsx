import React from "react";
import Header from "../header/header";
import Datas from "./components/data";

import "@/styles/dashboard.css";

const Dashboard = () => {

    return(
        <main>
            <Header />
            <Datas />
        </main>
    )
}

export default Dashboard;