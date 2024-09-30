import React, { useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchCharacters,
    setItemsPerPage,
    setCurrentPage,
    searchCharacters,
    setSortOrder,
    sortCharacters
} from '../../actions/charactersActions.ts';
import { CharacterState } from '../../types';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    TextField,
    Paper,
} from '@mui/material';

const CharacterTable: React.FC = () => {
    const dispatch = useDispatch();
    const { loading, characters, error, sortOrder, sortBy, itemsPerPage, currentPage, totalCharacters, searchQuery } = useSelector((state: CharacterState) => state);

    useEffect(() => {
        dispatch(fetchCharacters());
    }, [dispatch]);

    const handleItemsPerPageChange = (event: ChangeEvent<{ value: unknown }>) => {
        dispatch(setItemsPerPage(Number(event.target.value)));
        dispatch(setCurrentPage(1)); // Reset to first page
    };

    const handlePageChange = (_event: unknown, newPage: number) => {
        dispatch(setCurrentPage(newPage + 1));
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchCharacters(e.target.value));
    };

    const handleSortByName = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch(setSortOrder(newOrder));
        dispatch(sortCharacters('name', newOrder)); // Pass sortBy and sortOrder
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Filter characters based on search query
    const filteredCharacters = characters.filter((char) =>
        char.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Paper sx={{ height: 500, width: '100%', overflow: 'hidden' }}>
                <TextField
                    label="Search Characters"
                    variant="outlined"
                    onChange={handleSearch}
                    fullWidth
                    margin="normal"
                />
                <TableContainer className="vertical-scroll-content" component={Paper} sx={{ maxHeight: 'calc(100% - 80px)', overflow: 'hidden auto' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                <TableCell>
                                    <TableSortLabel
                                        active={sortBy === 'name'}
                                        direction={sortOrder}
                                        onClick={handleSortByName}
                                    >
                                        Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>TV Shows</TableCell>
                                <TableCell>Video Games</TableCell>
                                <TableCell>Allies</TableCell>
                                <TableCell>Enemies</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCharacters
                                .map((char) => (
                                    <TableRow key={`${char.id ?? Math.random()}-${char.name}`}>
                                        <TableCell>{char.name}</TableCell>
                                        <TableCell>{char.tvShows.length}</TableCell>
                                        <TableCell>{char.videoGames.length}</TableCell>
                                        <TableCell>{char.allies.join(', ')}</TableCell>
                                        <TableCell>{char.enemies.join(', ')}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <TablePagination
                rowsPerPageOptions={[10, 20, 50, 100, 200, 500]}
                component="div"
                count={totalCharacters}
                rowsPerPage={itemsPerPage}
                page={currentPage - 1}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleItemsPerPageChange}
            />
        </>
    );
};

export default CharacterTable;
