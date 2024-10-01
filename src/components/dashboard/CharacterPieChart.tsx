import {useMemo, useState} from 'react';
import Chart from 'react-apexcharts';
import {useSelector} from "react-redux";
import {CharacterState} from "../../types";

const CharacterPieChart = () => {
    const { characters } = useSelector((state: CharacterState) => state);

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
        <>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="pie"
                height="350"
            />
        </>
    );
};

export default CharacterPieChart;
