import {
    FETCH_CHARACTERS_FAILURE,
    FETCH_CHARACTERS_REQUEST,
    FETCH_CHARACTERS_SUCCESS,
    SEARCH_CHARACTERS,
    SET_CURRENT_PAGE,
    SET_ITEMS_PER_PAGE,
    SET_SORT_ORDER,
    SET_TOTAL_CHARACTERS,
    SORT_CHARACTERS
} from '../actions/actionTypes';
import {CharacterActionTypes, CharacterState} from '../types';

const initialState: CharacterState = {
    loading: false,
    characters: [],
    error: null,
    itemsPerPage: 50,
    currentPage: 1,
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc',
    totalCharacters: 0
};

const characterReducer = (state = initialState, action: CharacterActionTypes): CharacterState => {
    switch (action.type) {
        case FETCH_CHARACTERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_CHARACTERS_SUCCESS:
            return {
                ...state,
                loading: false,
                characters: action.payload,
            };
        case FETCH_CHARACTERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SET_ITEMS_PER_PAGE:
            return {
                ...state,
                itemsPerPage: action.payload,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        case SET_TOTAL_CHARACTERS:
            return {
                ...state,
                totalCharacters: action.payload,
            };
        case SEARCH_CHARACTERS:
            return {
                ...state,
                searchQuery: action.payload,
            };
        case SET_SORT_ORDER:
            return {
                ...state,
                sortBy: action.payload,
            };
        case SORT_CHARACTERS:
            const { sortBy, sortOrder } = action.payload;
            const sortedCharacters = [...state.characters].sort((a, b) => {
                if (sortBy === 'name') {
                    return sortOrder === 'asc'
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name);
                }
                return 0; // Add additional sorting logic for other fields if needed
            });

            return {
                ...state,
                characters: sortedCharacters,
                sortBy,
                sortOrder,
            };
        default:
            return state;
    }
};

export default characterReducer;
