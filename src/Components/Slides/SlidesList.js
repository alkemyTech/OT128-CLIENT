import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import SlidesSearch from './SlidesSearch'

const Datos = [
  {
    id: 1,
    title: 'Titulo 1',
    image: '/images/blog-img-04',
    order: 8,
  },
  {
    id: 2,
    title: 'Titulo 2',
    image: '/images/blog-img-02',
    order: 9,
  },
]
const columns = ['title', 'image', 'order']

export default function SlidesList() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [items, setItems] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = ({ target }) => {
    setRowsPerPage(+target.value)
    setPage(0)
  }

  useEffect(() => {
    setItems(
      [...items].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    )
  }, [page])

  return (
    <Paper>
      <SlidesSearch />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Datos.map((e, i) => {
              return (
                <TableRow key={i}>
                  {columns.map((column, i) => {
                    return <TableCell key={i}>{e[column]}</TableCell>
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
