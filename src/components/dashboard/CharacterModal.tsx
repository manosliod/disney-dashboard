import React from 'react';
import {Dialog, DialogTitle, DialogContent, Slide, IconButton} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface CharacterDetailsModalProps {
    open: boolean;
    loading: boolean;
    onClose: () => void;
    character: {
        name: string;
        imageUrl: string;
        tvShows: string[];
        videoGames: string[];
    };
}

// Define the transition
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CharacterDetailsModal: React.FC<CharacterDetailsModalProps> = ({ open, loading, onClose, character }) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition} // Apply the transition
            keepMounted
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiDialog-paper': {
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    margin: 0,
                    width: '100%',
                    maxWidth: '450px',
                    height: '100%',
                    maxHeight: '100%',
                    borderRadius: 0
                },
            }}
        >
            {
                loading ? <FontAwesomeIcon icon={faSpinner} size="2x" spin style={{ marginBlockStart: '24px', width: 'min-content', alignSelf: 'center' }} />
                    :
                    <>
                        <DialogTitle sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            {character.name}
                            <IconButton onClick={onClose} aria-label="close" style={{ marginInlineStart: 'auto' }}>
                                <FontAwesomeIcon icon={faTimes} />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <img src={character.imageUrl} alt={character.name} style={{ width: '100%', height: 'auto', maxWidth: '150px', maxHeight: '150px', objectFit: 'cover', borderRadius: '10px' }} />
                            <h4>TV Shows</h4>
                            {!!character.tvShows.length ?
                                <ul>
                                    {character.tvShows.map((show, index) => (
                                        <li key={index}>{show}</li>
                                    ))}
                                </ul>
                                : 'none'}
                            <h4>Video Games</h4>
                            {!!character.videoGames.length ?
                                <ul>
                                    {character.videoGames.map((show, index) => (
                                        <li key={index}>{show}</li>
                                    ))}
                                </ul>
                                : 'none'}
                        </DialogContent>
                    </>
            }

        </Dialog>
    );
};

export default CharacterDetailsModal;
