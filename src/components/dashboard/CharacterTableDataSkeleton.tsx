import {
    TableCell,
    TableRow,
    Skeleton,
} from '@mui/material';
import {useSelector} from "react-redux";
import {CharacterState} from "../../types";

const CharacterTableDataSkeleton = () => {
    const { itemsPerPage } = useSelector((state: CharacterState) => state);

    return (
        Array.from(new Array(itemsPerPage)).map((_, index) => (
                <TableRow key={index}>
                    <TableCell><Skeleton sx={{ minWidth: 150 }} /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                </TableRow>
            ))
    )
}
export default CharacterTableDataSkeleton