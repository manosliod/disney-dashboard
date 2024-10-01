import {useMemo, useState} from 'react';
import Chart from 'react-apexcharts';
import {useSelector} from "react-redux";
import {CharacterState} from "../../types";
import ExportData from "./ExportData.tsx";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CharacterPieChart = () => {
    const { characters, loading } = useSelector((state: CharacterState) => state);

    const calculateTotalFilms = () => {
        return characters.reduce((total, character) => total + character.films.length, 0);
    };

    const [totalFilms, setTotalFilms] = useState<number>(0)
    const chartData = useMemo(() => {
        const filmsCount: { [key: string]: number } = {};

        characters.forEach(character => {
            filmsCount[character.name] = character.films.length;
        });
        setTotalFilms(calculateTotalFilms())

        return {
            series: Object.values(filmsCount),
            options: {
                chart: {
                    type: 'pie',
                },
                labels: Object.keys(filmsCount),
                title: {
                    text: 'Characters Participation in Films',
                    align: 'center',
                    style: {
                        fontSize: '20px',
                        color: '#000'
                    },
                },
                tooltip: {
                    y: {
                        formatter: (value: number) => {
                            const percentage = ((value / totalFilms) * 100).toFixed(2);
                            return `${value} films (${percentage}%)`;
                        },
                    },
                },
            },
        };
    }, [characters, totalFilms]);

    return (
        loading ?
            <FontAwesomeIcon icon={faSpinner} size="2x" spin style={{ marginBlockStart: '24px', width: 'min-content', alignSelf: 'center' }} />
            :
            <>
                <Chart
                    options={'pie'}
                    series={chartData.series}
                    type="pie"
                    height="350"
                />
                <ExportData characters={characters} />
            </>
    );
};

export default CharacterPieChart;
