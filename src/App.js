import './App.css';
import { Switch } from 'react-router-dom';
import 'antd/dist/antd.css';

//HOC
import { UserTemplate } from './Templates/UserTemplate/UserTemplate';
import { HomeTemplate } from './Templates/HomeTemplate/HomeTemplate';

//Template
import HomeIndex from './Pages/Home/HomeIndex'
import CreateProject from './Components/CreateProject/CreateProject';
import ProjectManagement from './Components/ProjectManagement/ProjectManagement';
import Login from './Pages/User/Login/Login'
import Resignter from './Pages/User/Resignter/Resignter'
import UserInfomation from './Components/UserInfomation/UserInfomation';
import ProjectSetting from './Components/ProjectSetting/ProjectSetting';

function App() {
  return (
    <>
      <Switch>
        <UserTemplate exact path="/login" Component={Login} />
        <HomeTemplate exact path="/taiKhoan" Component={UserInfomation} />
        <UserTemplate exact path="/resignter" Component={Resignter} />
        <HomeTemplate exact path="/" Component={HomeIndex} />
        <HomeTemplate exact path="/homeindex" Component={HomeIndex} />
        <HomeTemplate exact path="/homeindex/:id" Component={HomeIndex} />
        <HomeTemplate exact path="/project" Component={ProjectSetting} />
        <HomeTemplate exact path="/projectmanagement" Component={ProjectManagement} />
        <HomeTemplate exact path="/createProject" Component={CreateProject} />
      </Switch>
    </>
  );
}

export default App;
