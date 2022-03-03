import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button } from '@mui/material'
import { alertServiceConfirm } from '../AlertService'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner'
import { deleteCategoryThunk } from '../../features/categories/categoriesReducer'

const CategoriesList = () => {
  // Retrieve data from api
  const dispatch = useDispatch()
  const state = useSelector((state) => state.categories)

  // function call to delete category
  const deleteCategory = (params) => {
    dispatch(deleteCategoryThunk(params.id))
  }

  // set table
  const columns = [
    {
      field: 'edit',
      headerName: 'Editar',
      sortable: false,
      width: 70,

      renderCell: (params) => {
        return (
          <Button
            component={Link}
            to={`/backoffice/categories/create/${params.id}`}
            endIcon={<EditIcon />}
          />
        )
      },
    },
    {
      field: 'delete',
      headerName: 'Borrar',
      sortable: false,
      width: 70,

      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation()
          alertServiceConfirm(
            'Desea eliminar esta categoría?',
            'eliminar',
            () => {
              deleteCategory(params)
            },
          )
        }

        return (
          <Button>
            <DeleteIcon sx={{ color: 'rgb(255, 0, 0)' }} onClick={onClick} />
          </Button>
        )
      },
    },
    { field: 'name', headerName: 'Nombre', name: 'Full Name', width: 170 },
    {
      width: 270,
      field: 'created_at',
      headerName: 'Fecha creación',
      type: 'date',
      valueFormatter: (params) => {
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
        const d = new Date(params.value)
        return d.toLocaleDateString('es-AR', options)
      },
    },
  ]

  return (
    <Box
      width={{ sx: '100%', md: '600px' }}
      style={{ backgroundColor: 'white', margin: 'auto' }}
    >
      <Link
        to="/backoffice/categories/create"
        style={{ textDecoration: 'none' }}
      >
        <Button variant="outlined" sx={{ m: 2 }}>
          {' '}
          Crear nueva Categoía
        </Button>
      </Link>
      {state.loader ? (
        <Spinner />
      ) : (
        <DataGrid
          rows={state.allCategories}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          style={{ height: 600 }}
        />
      )}
    </Box>
  )
}

export default CategoriesList
