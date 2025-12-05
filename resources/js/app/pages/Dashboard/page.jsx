import React from "react";
import HeaderSection from "./sections/header-section";
import ActionCardSection from "./sections/action-card-section";
import StatsSection from "./sections/stats-section";
import RaffleListSection from "./sections/raffle-list-section";

const Page = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
            {/* Header Section */}
            <HeaderSection />

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-8 mt-8 mb-12">
                {/* Action Cards Section */}
                <ActionCardSection />

                {/* Stats Section */}
                <StatsSection />

                {/* Raffle List Section */}
                <RaffleListSection />
            </div>
        </div>
    );
};

export default Page;