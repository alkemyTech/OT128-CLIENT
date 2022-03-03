import '../FormStyles.css'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toBase64 } from '../../utils/toBase64'
import { SUPPORTED_FORMATS } from '../../utils/supportedFormatsImg'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { LinearProgressFeedback } from '../LinearProgress'
import {
  getActivity,
  postActivity,
  putActivity,
} from '../../Services/apiServices/activitiesApiService'
import { alertServiceError, alertServiceInfoTimer } from '../AlertService'
import {
  Box,
  Button,
  Container,
  Input,
  TextField,
  Typography,
} from '@mui/material'
import getBase64FromUrl from '../../utils/apiToBase64'
import Spinner from '../Spinner'

const ActivitiesForm = () => {
  let id = useParams().id
  const [responseServer, setResponseServer] = useState(undefined)
  const [activity, setActivity] = useState('')
  const [loader, setLoader] = useState(false)
  const [urlImage, setUrlImage] = useState('')
  const [previewImg, setPreviewImg] = useState('')
  const [baseImage, setBaseImage] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (!id) return
    ;(async () => {
      setLoader(true)

      const response = await getActivity(id)
      if (response.error) {
        alertServiceError(
          response.message,
          'No se pudo obtener la información solicitada',
        )
        history.push('/backoffice/activities')
      }

      const dataActivity = response.data?.data

      if (dataActivity) {
        setActivity(dataActivity)
      } else {
        alertServiceError(
          'No se pudo cargar la actividad buscada',
          'ID inválido',
        )
        history.push('/backoffice/activities')
      }

      setLoader(false)
      setUrlImage(await getBase64FromUrl(activity.image))
    })()
  }, [history, id])

  useEffect(() => {
    if (!baseImage) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImg(reader.result)
    }
    reader.readAsDataURL(baseImage)
  }, [baseImage])

  const formikInitialValues = {
    name: activity.name || '',
    description: activity.description || '',
    image: urlImage || undefined,
  }
  const formikValidationSchema = Yup.object({
    name: Yup.string().required('El  nombre es requerido.'),
    description: Yup.string(),
    image: Yup.mixed()
      .required('ingrese una imagen')
      .test(
        'fileType',
        'Formato incorrecto. Sólo se aceptan archivos .jpg, .jpeg, .png',
        (value) => {
          if (value) return SUPPORTED_FORMATS.includes(value && value.type)
        },
      ),
  })

  const handleSubmit = async (formData) => {
    setLoader(true)
    const imageBase64 = await toBase64(formData.image)
    if (id) {
      setResponseServer(
        await putActivity(id, {
          ...formData,
          image: imageBase64,
        }),
      )
    } else {
      setResponseServer(
        await postActivity({
          ...formData,
          image: imageBase64,
        }),
      )
    }

    // alert in case of fail to update or create a new activity
    if (responseServer.error) {
      alertServiceError(
        responseServer.message,
        'Se produjo un error al crear o editar una actividad.',
      )
    }
    setLoader(false)
  }

  useEffect(() => {
    if (responseServer?.error) {
      alertServiceError('Error', responseServer.message)
      setLoader(false)
    } else if (responseServer?.data) {
      alertServiceInfoTimer(
        'top',
        'info',
        responseServer.data.message,
        false,
        3000,
      )
      setLoader(false)
      setTimeout(() => {
        setResponseServer(undefined)
        history.push('/backoffice/activities')
      }, 3000)
    }
  }, [responseServer, history])

  return (
    <Formik
      enableReinitialize
      initialValues={formikInitialValues}
      validationSchema={formikValidationSchema}
      onSubmit={handleSubmit}
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
          <Box sx={{ boxShadow: 5, p: 5, mt: 2, background: 'white' }}>
            <Typography variant="h4">
              {!id ? 'Crear Actividad' : 'Editar Actividad'}
            </Typography>

            {previewImg || activity.image ? (
              <img
                id="imageid"
                style={{ maxWidth: '100%' }}
                src={previewImg || activity.image}
                alt=""
              />
            ) : null}

            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.name && errors.name}
                label="Título Actividad"
                error={touched.name && Boolean(errors.name)}
              />
              <CKEditor
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
                  type="file"
                  name="image"
                  accept="image/*"
                  id="image"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    setFieldValue('image', e.target.files[0])
                    setBaseImage(e.currentTarget.files[0])
                  }}
                />
                <Button fullWidth variant="outlined" component="span">
                  subir imagen
                </Button>
                <ErrorMessage component="small" name="image" />
              </label>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!setLoader}
              >
                {id ? 'Editar actividad' : 'Crear actividad'}
              </Button>
              <LinearProgressFeedback isActive={!setLoader} />
            </form>
          </Box>
        </Container>
      )}
    </Formik>
  )
}

export default ActivitiesForm
