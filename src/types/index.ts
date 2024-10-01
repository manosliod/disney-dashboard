import {
  FETCH_CHARACTERS_FAILURE,
  FETCH_CHARACTERS_REQUEST,
  FETCH_CHARACTERS_SUCCESS,
  SEARCH_CHARACTERS,
  SET_CURRENT_PAGE,
  SET_TOTAL_CHARACTERS,
  SET_ITEMS_PER_PAGE,
  SORT_CHARACTERS,
  SET_SORT_ORDER,
} from '../actions/actionTypes.ts'

export interface ApiResponse {
  data: Character | Character[]
  info: any // Use a more specific type if you know the structure
}

export interface Character {
  _id: string
  id: string
  name: string
  imageUrl: string
  films: string[]
  tvShows: string[]
  videoGames: string[]
  allies: string[]
  enemies: string[]
}

export interface CharacterState {
  loading: boolean
  characters: Character[]
  error: string | null
  itemsPerPage: number
  currentPage: number
  totalCharacters: number
  searchQuery: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

// Action Type Definitions
interface FetchCharactersRequestAction {
  type: typeof FETCH_CHARACTERS_REQUEST
}

interface FetchCharactersSuccessAction {
  type: typeof FETCH_CHARACTERS_SUCCESS
  payload: Character[]
}

interface FetchCharactersFailureAction {
  type: typeof FETCH_CHARACTERS_FAILURE
  payload: string
}

interface SetItemsPerPageAction {
  type: typeof SET_ITEMS_PER_PAGE
  payload: number
}

interface SetTotalCharactersAction {
  type: typeof SET_TOTAL_CHARACTERS
  payload: number
}

interface SetCurrentPageAction {
  type: typeof SET_CURRENT_PAGE
  payload: number
}

interface SearchCharactersAction {
  type: typeof SEARCH_CHARACTERS
  payload: string
}

interface SetSortOrder {
  type: typeof SET_SORT_ORDER
  payload: string
}

interface SortCharactersAction {
  type: typeof SORT_CHARACTERS
  payload: Object
}

export type CharacterActionTypes =
  | FetchCharactersRequestAction
  | FetchCharactersSuccessAction
  | FetchCharactersFailureAction
  | SetItemsPerPageAction
  | SetCurrentPageAction
  | SearchCharactersAction
  | SetSortOrder
  | SortCharactersAction
  | SetTotalCharactersAction
