import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button } from '@mui/material'
import { alertServiceConfirm } from '../AlertService'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner'
import InputSearchUsers from './InputSearchUser'
import { deleteUserThunk } from '../../features/backofficeUsers/usersReducer'

const TableUsers = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.users)

  // function call to delete user
  const deleteUser = (params) => {
    dispatch(deleteUserThunk(params.id))
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
            to={`/backoffice/users/create/${params.id}`}
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
            'Desea eliminar este usuario?',
            'eliminar',
            () => {
              deleteUser(params)
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
      field: 'email',
      headerName: 'Correo Electrónico',
      name: 'Email de contacto',
      width: 270,
    },
  ]

  return (
    <Box
      width={{ sx: '100%', md: '600px' }}
      style={{ margin: 'auto', backgroundColor: 'white' }}
    >
      <InputSearchUsers />
      <Link to="/backoffice/users/create" style={{ textDecoration: 'none' }}>
        <Button variant="outlined" sx={{ m: 2 }}>
          {' '}
          Crear nuevo usuario
        </Button>
      </Link>
      {state.loader ? (
        <Box sx={{ py: 4 }}>
          <Spinner />
        </Box>
      ) : (
        <DataGrid
          rows={state.users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          style={{ height: 600 }}
        />
      )}
    </Box>
  )
}

export default TableUsers
