import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import BackOfficeHome from '../Components/BackOffice/BackOfficeHome'
import ActivitiesForm from '../Components/Activities/ActivitiesForm'
import CategoriesForm from '../Components/Categories/CategoriesForm'
import NewsForm from '../Components/News/NewsForm'
import MembersForm from '../Components/Members/MembersForm'
import SlidesForm from '../Components/Slides/SlidesForm'
import TestimonialForm from '../Components/Testimonials/TestimonialsForm'
import ProjectsForm from '../Components/Projects/ProjectsForm'
import OrganizationForm from '../Components/Organization/OrganizationForm'
import OrganizationScreen from '../Components/Organization/OrganizationScreen'
import MembersScreen from '../Components/Members/MembersScreen'
import ActivitiesScreen from '../Components/Activities/ActivitiesScreen'
import UserForm from '../Components/Users/UsersForm'
import SlidesScreen from './../Components/Slides/SlidesList'
import NewsTable from '../Components/News/Table/NewsTable'
import CategoriesHome from '../Components/Categories/CategoriesHome'

import UsersHome from '../Components/Users/UsersHome'

export const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated === true ? children : <Redirect to="/login" />
      }}
    />
  )
}

export const privateRoutes = [
  <PrivateRoute key="backoffice" exact path="/backoffice">
    <BackOfficeHome />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeActivitiesCreateId"
    exact
    path="/backoffice/activities/create/:id"
  >
    <ActivitiesForm />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeActivitiesCreate"
    exact
    path="/backoffice/activities/create"
  >
    <ActivitiesForm />
  </PrivateRoute>,

  <PrivateRoute key="backofficeActivities" exact path="/backoffice/activities">
    <ActivitiesScreen />
  </PrivateRoute>,

  <PrivateRoute key="backofficeCategories" exact path="/backoffice/categories">
    <CategoriesHome />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeCategoriesForm"
    exact
    path="/backoffice/categories/create"
  >
    <CategoriesForm />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeCategoriesFormCreate"
    path="/backoffice/categories/create/:id"
  >
    <CategoriesForm />
  </PrivateRoute>,

  <PrivateRoute key="backofficeNews" exact path="/backoffice/news">
    <NewsTable />
  </PrivateRoute>,

  <PrivateRoute key="backofficeNewsCreate" exact path="/backoffice/news/create">
    <NewsForm />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeNewsCreateId"
    path="/backoffice/news/create/:newsId"
  >
    <NewsForm />
  </PrivateRoute>,

  <PrivateRoute key="backofficeMembers" exact path="/backoffice/members">
    <MembersScreen />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeMembersCreate"
    exact
    path="/backoffice/members/create"
  >
    <MembersForm />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeMembersCreateId"
    path="/backoffice/members/create/:id"
  >
    <MembersForm />
  </PrivateRoute>,

  <PrivateRoute key="backofficeSlides" exact path="/backoffice/slides">
    <SlidesScreen />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeSlidesCreate"
    exact
    path="/backoffice/slides/create"
  >
    <SlidesForm />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeSlidesCreateId"
    path="/backoffice/slides/create/:slidesId"
  >
    <SlidesForm />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeCreate-testimonials"
    exact
    path="/backoffice/create-testimonials"
  >
    <TestimonialForm />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeCreateTestimonialsId"
    path="/backoffice/create-testimonials/:id"
  >
    <TestimonialForm />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeCreateProject"
    exact
    path="/backoffice/create-project"
  >
    <ProjectsForm />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeOrganization"
    exact
    path="/backoffice/organization"
  >
    <OrganizationScreen />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeOrganizationEdit"
    exact
    path="/backoffice/organization/edit"
  >
    <OrganizationForm />
  </PrivateRoute>,

  <PrivateRoute key="backofficeUsers" exact path="/backoffice/users">
    <UsersHome />
  </PrivateRoute>,

  <PrivateRoute
    key="backofficeUsersCreate"
    exact
    path="/backoffice/users/create"
  >
    <UserForm />
  </PrivateRoute>,
]
