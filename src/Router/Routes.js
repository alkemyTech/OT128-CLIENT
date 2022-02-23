import { Route, Redirect, BrowserRouter } from 'react-router-dom'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import SchoolCampaign from '../Campaigns/School/SchoolCampaign'
import ToysCampaign from '../Campaigns/Toys/ToysCampaign'
import NotFound from '../Components/NotFound/NotFound'

export const Routes = () => {
  return (
    <BrowserRouter>
      {/* <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
      > */}
      <Route
        exact
        path={[
          '/',
          '/novedades',
          '/novedades/:newsId',
          '/contacto',
          '/nosotros',
          '/create-user',
          '/activities',
          '/activities/:id',
          '/donations',
          '/testimonios',
          '/login',
          '/register',
          '/gracias'
        ]}
        component={PublicRoutes}
      />

      <Route
        exact
        path={[
          '/backoffice',
          '/backoffice/activities',
          '/backoffice/activities/create',
          '/backoffice/activities/create/:id',
          '/backoffice/categories',
          '/backoffice/categories/create',
          '/backoffice/categories/create/:id',
          '/backoffice/news',
          '/backoffice/news/create',
          '/backoffice/news/create/:newsId',
          '/backoffice/members',
          '/backoffice/members/create',
          '/backoffice/members/create/:id',
          '/backoffice/slides',
          '/backoffice/slides/create',
          '/backoffice/slides/create/:slideId',
          '/backoffice/create-testimonials',
          '/backoffice/create-testimonials/:id',
          '/backoffice/create-project',
          '/backoffice/organization',
          '/backoffice/organization/edit',
          '/backoffice/users',
          '/backoffice/users/create',
          '/backoffice/users/create/:id',
        ]}
        component={PrivateRoutes}
      />

      <Route path="/school-campaign" component={SchoolCampaign} />

      <Route path="/toys-campaign" component={ToysCampaign} />

      <Route path="/404" component={NotFound} />

      <Route path="*">
        <Redirect to="/404" />
      </Route>
      {/* </AnimatedSwitch> */}
    </BrowserRouter>
  )
}
