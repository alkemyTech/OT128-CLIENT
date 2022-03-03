import { Avatar, Paper, Typography } from '@mui/material'
import parse from 'html-react-parser'

export const TestimonialGrid = ({ id, link, name, image, description }) => {
  const descriptionParse = parse(String(description)).props?.children

  return (
    <Paper
      sx={{
        boxShadow: 8,
        backgroundColor: 'transparent',
        position: 'relative',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        marginBottom: '2rem',
        width: '100%',
        maxHeight: '30rem',
        padding: '1rem',
        gap: '15px',
      }}
    >
      <Avatar
        sx={{
          width: 200,
          height: 200,
          alignSelf: { xs: 'center', md: 'start' },
        }}
        src={image}
        alt={name}
      />
      <div
        style={{
          width: '100%',
          overflow: 'auto',
          // paddingLeft: '10px',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          {name}
        </Typography>
        <Typography variant="body1">
          {descriptionParse?.length > 0
            ? descriptionParse
            : 'no se proporcionó descripción'}
        </Typography>
      </div>
    </Paper>
  )
}
