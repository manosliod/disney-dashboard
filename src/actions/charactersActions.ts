import { Dispatch } from 'redux'
import {
  FETCH_CHARACTERS_REQUEST,
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_FAILURE,
  SET_ITEMS_PER_PAGE,
  SET_CURRENT_PAGE,
  SET_TOTAL_CHARACTERS,
  SEARCH_CHARACTERS,
  SORT_CHARACTERS,
  SET_SORT_ORDER,
} from './actionTypes'
import { ApiResponse, Character, CharacterActionTypes } from '../types'

export const fetchCharacters = () => async (dispatch: Dispatch<CharacterActionTypes>, getState: () => any) => {
  const { currentPage, itemsPerPage, sortBy, sortOrder } = getState() || {}
  dispatch({ type: FETCH_CHARACTERS_REQUEST })

  try {
    const response = await fetch(`https://api.disneyapi.dev/character?page=${currentPage}&pageSize=${itemsPerPage}`)
    const data: ApiResponse = await response.json()

    dispatch({
      type: FETCH_CHARACTERS_SUCCESS,
      payload: data.data as Character[],
    })
    dispatch({
      type: SET_TOTAL_CHARACTERS,
      payload: data.info.totalPages * data.info.count,
    })
    dispatch({
      type: SORT_CHARACTERS,
      payload: { sortBy, sortOrder },
    })
  } catch (error) {
    dispatch({
      type: FETCH_CHARACTERS_FAILURE,
      payload: error.message,
    })
  }
}

export const setItemsPerPage = (items: number) => (dispatch: Dispatch<CharacterActionTypes>) => {
  dispatch({
    type: SET_ITEMS_PER_PAGE,
    payload: items,
  })

  dispatch(fetchCharacters())
}

export const setCurrentPage = (page: number) => (dispatch: Dispatch<CharacterActionTypes>) => {
  dispatch({
    type: SET_CURRENT_PAGE,
    payload: page,
  })

  dispatch(fetchCharacters())
}

export const searchCharacters = (query: string): CharacterActionTypes => ({
  type: SEARCH_CHARACTERS,
  payload: query,
})

export const sortCharacters = (sortBy: string, sortOrder: 'asc' | 'desc'): CharacterActionTypes => ({
  type: SORT_CHARACTERS,
  payload: { sortBy, sortOrder },
})

export const setSortOrder = (order: 'asc' | 'desc'): CharacterActionTypes => ({
  type: SET_SORT_ORDER,
  payload: order,
})
