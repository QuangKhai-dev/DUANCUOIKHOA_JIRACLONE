import './App.css';
import { Switch } from 'react-router-dom';
import 'antd/dist/antd.css';

//HOC
import { UserTemplate } from './Templates/UserTemplate/UserTemplate';
import { HomeTemplate } from './Templates/HomeTemplate/HomeTemplate';

//Template
import HomeIndex from './Pages/Home/HomeIndex'
import CreateProject from './Components/CreateProject/CreateProject';
import Login from './Pages/User/Login/Login'
import Resignter from './Pages/User/Resignter/Resignter'

function App() {
  return (
    <>
      <Switch>
        <HomeTemplate exact path="/" Component={HomeIndex} />
        <HomeTemplate exact path="/createProject" Component={CreateProject} />
        <UserTemplate exact path="/login" Component={Login} />
        <UserTemplate exact path="/resignter" Component={Resignter} />
      </Switch>
    </>
  );
}

export default App;
