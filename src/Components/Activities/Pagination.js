import React from 'react'
import { makeStyles, Divider, Box } from '@material-ui/core'
import Pagination from '@mui/material/Pagination'
import { ActivitiesCard } from './ActivitiesList'
import { Grid } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  paginator: {
    justifyContent: 'center',
  }
}))

export const AllProjects = ({ projectsList }, { numItems = 6 }) => {
  const classes = useStyles()
  const itemsPerPage = numItems
  const [page, setPage] = React.useState(1)
  const [noOfPages] = React.useState(
    Math.ceil(projectsList.length / itemsPerPage),
  )

  const handleChange = (event, value) => {
    setPage(value)
  }

  return (
    <Box sx={{
      maxWidth: '1400px',
      justifyContent: 'center',
      mx: 'auto',
    }}>
      <Grid container  maxWidth='1300px'  sx={{ mx:'auto' }}>
        {projectsList
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((projectItem, index) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={index} sx={{  display: 'flex', justifyContent: 'center', mx:{ md:'auto' } }}>
                <ActivitiesCard
                  name={projectItem.name}
                  image={projectItem.image}
                  description={projectItem.description}
                  isMin={true}
                  key={index}
                />
              </Grid>
            )
          })}      
      </Grid>
      <Divider />
      <Box component="span" sx={{ mx:'20px' }}>
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
          size="small"
          showFirstButton
          showLastButton
          classes={{ ul: classes.paginator }}
        />
      </Box>
    </Box>
  )
}


export const activitiesMokData = [
    {
        id: '',    
        name: '',
        image: '',
        description: '',   
    },
    {
        id: 1,    
        name: 'Apoyo Escolar para el nivel Primario',
        image: 'https://www.diariodeferrol.com/images/showid2/3992561?w=900',
        description: 'El espacio de apoyo escolar es el corazón del área educativa. Actualmente se encuentran inscriptos a este programa 150 niños y niñas de 6 a 15 años',   
    },
    {
        id: 2,    
        name: 'Apoyo Escolar Nivel Secuandaria',
        image: 'data:image/jpeg;base64,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',
        description: 'Del mismo modo que en la primaria, este taller es el corazón del área secundaria. Este espacio también es utilizado por los jóvenes como un punt de encuentro.',   
    },
    {
        id: 3,    
        name: 'Tutorias',
        image: 'https://us.123rf.com/450wm/rido/rido1601/rido160100098/51077858-vista-de-%C3%A1ngulo-alto-de-los-empresarios-estrechar-la-mano-y-cerrar-un-trato-el-trabajo-en-equipo-de-.jpg?ver=6',
        description: 'Es un programa destinado a jóvenes a partir del tercer año de secundaria, cuyo objetivo es garantizar su permanencia en la escuela y construir un proyecto de vida que da sentido al colegio.',   
    },
    {
        id: 4,    
        name: 'Taller Arte y Cuentos',
        image: 'https://mymodernmet.com/wp/wp-content/uploads/2020/04/artist-grants-coronavirus-1.jpg',
        description: 'Taller literario y de manualidades que se realiza semanalmente.',   
    },
    {
        id: 5,    
        name: 'Paseos recreativos y educativos',
        image: 'https://gmotivar.files.wordpress.com/2015/07/vacaciones-recreativas.jpg',
        description: 'Estos paseos estan pensados para promover la participacion y sentido de pertenencia de los niños, niñas y adolescentes del área educativa.',   
    },
  ]


