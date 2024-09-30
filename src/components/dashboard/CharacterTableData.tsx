import React from "react";
import {
    TableCell,
    TableRow,
} from '@mui/material';
import {useSelector} from "react-redux";
import {CharacterState} from "../../types";

const CharacterTableData = () => {
    const { characters } = useSelector((state: CharacterState) => state);

    return (
        characters
            .map((char) => (
                <TableRow key={`${char.id ?? Math.random()}-${char.name}`}>
                    <TableCell sx={{ minWidth: 150 }}>{char.name}</TableCell>
                    <TableCell>{char.tvShows.length}</TableCell>
                    <TableCell>{char.videoGames.length}</TableCell>
                    <TableCell>{char.allies.join(', ')}</TableCell>
                    <TableCell>{char.enemies.join(', ')}</TableCell>
                </TableRow>
            ))
    )
}
export default CharacterTableData