import React, { useEffect, ChangeEvent, useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchCharacters,
    setItemsPerPage,
    setCurrentPage,
    searchCharacters,
    setSortOrder,
    sortCharacters
} from '../../actions/charactersActions.ts';
import {ApiResponse, Character, CharacterState} from '../../types';
import CharacterModal from './CharacterModal'; // Import modal component
import CharacterTableDataSkeleton from "./CharacterTableDataSkeleton.tsx";
import CharacterTableData from "./CharacterTableData.tsx";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CharacterTable: React.FC = () => {
    const dispatch = useDispatch();
    const { loading, error, sortOrder, sortBy, itemsPerPage, currentPage, totalCharacters } = useSelector(
        (state: CharacterState) => state
    );

    // State for selected character and modal
    const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [loadingCharacter, setLoadingCharacter] = useState<boolean>(false);

    // Fetch characters on component mount or when currentPage/itemsPerPage change
    useEffect(() => {
        dispatch(fetchCharacters());
    }, [dispatch, currentPage, itemsPerPage]);

    // Handle pagination change
    const handlePageChange = (_event: unknown, newPage: number) => {
        dispatch(setCurrentPage(newPage + 1)); // Material UI uses 0-based index, we use 1-based
    };

    const handleItemsPerPageChange = (event: ChangeEvent<{ value: unknown }>) => {
        dispatch(setItemsPerPage(Number(event.target.value)));
        dispatch(setCurrentPage(1)); // Reset to first page when items per page change
    };

    // Handle sorting by name
    const handleSortByName = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        dispatch(setSortOrder(newOrder));
        dispatch(sortCharacters('name', newOrder)); // Pass sortBy and sortOrder
    };

    const handleRowClick = async (id: number) => {
        setLoadingCharacter(true);
        setModalOpen(true);
        try {
            const response = await fetch(`https://api.disneyapi.dev/character/${id}`);
            const data: ApiResponse = await response.json();
            const charData = data.data as Character
            setSelectedCharacter({
                name: charData.name,
                imageUrl: charData.imageUrl,
                tvShows: charData.tvShows || [],
                videoGames: charData.videoGames || [],
            });
        } catch (error) {
            console.error('Failed to fetch character details:', error);
        }
        setLoadingCharacter(false)
    };

    // Handle closing modal
    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedCharacter(null);
    };

    // Handle character search
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchCharacters(e.target.value));
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Paper sx={{ height: 500, width: '100%', overflow: 'hidden', minWidth: 650 }}>
                <TextField
                    label="Search Characters"
                    variant="outlined"
                    disabled={loading}
                    onChange={handleSearch}
                    fullWidth
                    margin="normal"
                />
                {
                    loading ? <FontAwesomeIcon icon={faSpinner} size="2x" spin style={{ marginBlockStart: '24px', width: 'min-content', alignSelf: 'center' }} />
                        :
                        <TableContainer className="vertical-scroll-content" component={Paper} sx={{ maxHeight: 'calc(100% - 80px)', overflow: 'hidden auto' }}>
                            <Table>
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
                                    <CharacterTableData onRowClick={handleRowClick} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                }
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
            {
                modalOpen && (
                    <CharacterModal
                        open={modalOpen}
                        loading={loadingCharacter}
                        onClose={handleModalClose}
                        character={selectedCharacter}
                    />
                )
            }
        </>
    );
};

export default CharacterTable;
