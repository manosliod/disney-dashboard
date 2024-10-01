import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Character } from "../../types";

interface ExportDataProps {
    characters: Character[];
}

const ExportData: React.FC<ExportDataProps> = ({ characters }) => {
    const exportData = characters.map(character => ({
        Name: character.name,
        Films: character.films ? character.films.join(', ') : 'N/A',
        TotalFilms: character.films ? character.films.length : 0,
    }));

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Characters");

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'Disney_Characters_Data.xlsx'); // Specify the file name here
    };

    return (
        <button onClick={handleExport}>Export to Excel</button>
    );
};

export default ExportData;
