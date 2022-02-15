import { Route } from 'react-router-dom'
import Index from '../Components/Home/Index'
import NewsDetail from '../Components/News/Detail/NewsDetail'
import About from '../Components/About/About'
import Activities from '../Components/Activities/ActivitiesDetails'
import NewsList from '../Components/News/NewsList'
import UserForm from '../Components/Users/UsersForm'
import SchoolCampaign from '../Campaigns/School/SchoolCampaign'
import ToysCampaign from '../Campaigns/Toys/ToysCampaign'
import LoginForm from '../Components/Auth/LoginForm'
import ContactHome from '../Components/Contact/ContactHome'
import { Detail } from '../Components/Activities/Detail/Detail'
import NotFound from '../Components/NotFound/NotFound'

export const publicRoutes = [
  <Route exact path="/" component={Index} key="Index" />,
  <Route exact path="/contacto" component={ContactHome} key="ContactHome" />,
  <Route exact path="/news" component={NewsList} key="NewsList" />,
  <Route path="/news/:newsId" component={NewsDetail} key="NewsDetail" />,
  <Route exact path="/nosotros" component={About} key="About" />,
  <Route exact path="/create-user" component={UserForm} key="UserForm" />,
  <Route
    exact
    path="/school-campaign"
    component={SchoolCampaign}
    key="SchoolCampaign"
  />,
  <Route
    exact
    path="/toys-campaign"
    component={ToysCampaign}
    key="ToysCampaign"
  />,
  <Route exact path="/login" component={LoginForm} key="LoginForm" />,
  <Route exact path="/activities" component={Activities} key="Activities" />,
  <Route path="/activities/:id" component={Detail} key="Detail" />,
  <Route path="/404" component={NotFound} key="NotFound" />,
]
