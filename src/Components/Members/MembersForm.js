import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Input, TextField } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { ErrorMessage, Formik } from 'formik'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import * as Yup from 'yup'
import '../FormStyles.css'
import { useParams, useHistory } from 'react-router-dom'
import { alertServiceError } from '../AlertService'
import Spinner from '../Spinner'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { SUPPORTED_FORMATS } from '../../utils/supportedFormatsImg'
import {
  postMemberRedux,
  putMemberRedux,
  resetStatus,
} from '../../features/members/membersReducer'
import { toBase64 } from '../../utils/toBase64'
import { getMembers } from '../../Services/apiServices/membersApiService'
import getBase64FromUrl from '../../utils/apiToBase64'

const MembersForm = () => {
  const state = useSelector((state) => state.members)
  const dispatch = useDispatch()

  const { id } = useParams()
  const history = useHistory()

  const [members, setMembers] = useState({})
  const [loader, setLoader] = useState(false)
  const [editable, setEditable] = useState(false)
  const [memberImg, setMemberImg] = useState('')
  const [urlImage, setUrlImage] = useState('')
  const [previewMemberImg, setPreviewMemberImg] = useState(null)

  useEffect(() => {
    if (!memberImg) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewMemberImg(reader.result)
    }
    reader.readAsDataURL(memberImg)
  }, [memberImg])

  // if params.id exist set the component to edit
  useEffect(() => {
    if (!id) return
    ;(async () => {
      setLoader(true)

      const response = await getMembers(id)
      if (response.error) {
        alertServiceError(
          response.message,
          'No se pudo obtener la información solicitada',
        )
        setEditable(false)
        history.push('/backoffice/members')
      }

      const dataMembers = response.data?.data

      if (dataMembers) {
        setMembers(dataMembers)
        setEditable(true)
      } else {
        alertServiceError('No se pudo cargar el miembro buscado', 'ID inválido')
        history.push('/backoffice/members')
      }

      setLoader(false)
      setUrlImage(await getBase64FromUrl(members.image))
    })()
  }, [history, id])

  //Hamdle submit

  const handleSubmit = async (values) => {
    const base64 = await toBase64(values.image)
    const memberToSend = {
      ...values,
      image: base64,
    }

    if (editable) {
      const queryPut = {
        body: memberToSend,
        id,
      }
      dispatch(putMemberRedux(queryPut))
    } else {
      dispatch(postMemberRedux(memberToSend))
    }
    if (state.status === 'error') {
      alertServiceError(state.errMsg, 'Se produjo un error, intente nuevamente')
    } else {
      dispatch(resetStatus())
      history.push('/backoffice/members')
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Debe tener al menos cuatro caracteres')
      .required('El campo nombre es obligatorio.'),

    description: Yup.string().required('El campo descripción es obligatorio.'),

    image: Yup.mixed()
      .required('Ingresá una imagen')
      .test(
        'fileType',
        'Sólo se aceptan archivos .jpg, .jpeg, .png',
        (value) => {
          if (value) return SUPPORTED_FORMATS.includes(value.type)
        },
      ),
    facebookUrl: Yup.string()
      .matches(
        /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w-]*)?/,
        'El link debe ser de Facebook',
      )
      .required('Ingresar al menos un link de redes sociales'),
    linkedinUrl: Yup.string()
      .matches(
        /(?:(?:http|https):\/\/)?(?:www.)?linkedin.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w-]*)?/,
        'El link debe ser de LinkedIn',
      )
      .required('Ingresar al menos un link de redes sociales'),
  })
  return loader ? (
    <Box sx={{ mt: '4rem' }}>
      <Spinner />
    </Box>
  ) : (
    <Formik
      enableReinitialize
      initialValues={{
        name: members.name || '',
        image: urlImage || '',
        description: members.description || '',
        facebookUrl: members.facebookUrl || '',
        linkedinUrl: members.linkedinUrl || '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        setFieldValue,
        touched,
      }) => (
        <Container>
          <Box sx={{ boxShadow: 5, p: 5, mt: 2, backgroundColor: 'white' }}>
            <h1>{editable ? 'Editar Miembro' : 'Crear Miembro'}</h1>
            {previewMemberImg || urlImage ? (
              <img
                style={{ maxWidth: '100%' }}
                src={previewMemberImg || urlImage}
                alt={state.members.name}
              />
            ) : null}
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                name="name"
                label="Nombre"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                onBlur={handleBlur}
              />

              {/* <Box component={CKEditor}></Box> */}
              <CKEditor
                name="description"
                editor={ClassicEditor}
                data={values.description}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  setFieldValue('description', data)
                }}
              />
              <ErrorMessage component="small" name="description" />

              <label htmlFor="image">
                <Input
                  name="image"
                  accept="image/*"
                  id="image"
                  multiple
                  type="file"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0]
                    setFieldValue('image', file)
                    setMemberImg(file)
                  }}
                  style={{ display: 'none' }}
                />

                <Button fullWidth variant="outlined" component="span">
                  Subir imagen.
                </Button>
                <ErrorMessage component="small" name="image" />
              </label>

              <TextField
                InputProps={{ startAdornment: <FacebookIcon /> }}
                fullWidth
                variant="standard"
                margin="normal"
                id="facebookUrl"
                name="facebookUrl"
                label="Perfil de Facebook"
                value={values.facebookUrl}
                onChange={handleChange}
                error={touched.facebookUrl && Boolean(errors.facebookUrl)}
                helperText={touched.facebookUrl && errors.facebookUrl}
                onBlur={handleBlur}
              />
              <TextField
                InputProps={{ startAdornment: <LinkedInIcon /> }}
                fullWidth
                variant="standard"
                margin="normal"
                id="linkedinUrl"
                name="linkedinUrl"
                label="Perfil de LinkedIn"
                value={values.linkedinUrl}
                onChange={handleChange}
                error={touched.linkedinUrl && Boolean(errors.linkedinUrl)}
                helperText={touched.linkedinUrl && errors.linkedinUrl}
                onBlur={handleBlur}
              />

              <Button type="submit" variant="contained" fullWidth>
                Confirmar Edición
              </Button>
            </form>
          </Box>
        </Container>
      )}
    </Formik>
  )
}

export default MembersForm
