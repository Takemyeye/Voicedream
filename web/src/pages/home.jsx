import React from "react";
import Header from "./header/header";
import TopPanel from "./homeUnit/topPanel"
import "@/styles/home.css";

const Home = () => {
    return (
        <main className="w-">
            <Header />
            <TopPanel />
        </main>
    )
}

export default Home;