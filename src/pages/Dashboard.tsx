import CharacterTable from "../components/dashboard/CharacterTable.tsx";
import CharacterPieChart from "../components/dashboard/CharacterPieChart.tsx";

function Dashboard() {
    return (
        <>
            <CharacterPieChart />
            <CharacterTable />
        </>
    )
}

export default Dashboard
