import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { useSelector } from 'react-redux'
import { CharacterState } from '../../types'

interface CharacterTableDataProps {
  onRowClick: (id: number) => void
}

const CharacterTableData: React.FC<CharacterTableDataProps> = ({ onRowClick }) => {
  const { characters } = useSelector((state: CharacterState) => state)

  return (
    <>
      {characters.map((char) => (
        <TableRow key={`${char._id ?? Math.random()}-${char.name}`} hover onClick={() => onRowClick(Number(char._id))}>
          <TableCell>{char.name}</TableCell>
          <TableCell>{char.tvShows.length}</TableCell>
          <TableCell>{char.videoGames.length}</TableCell>
          <TableCell>{char.allies.join(', ')}</TableCell>
          <TableCell>{char.enemies.join(', ')}</TableCell>
        </TableRow>
      ))}
    </>
  )
}

export default CharacterTableData
