import './App.css';
import { Switch } from 'react-router-dom';
import 'antd/dist/antd.css';

//HOC
import { UserTemplate } from './Templates/UserTemplate/UserTemplate';

//Template
import Login from './Pages/User/Login/Login'
import Resignter from './Pages/User/Resignter/Resignter'

function App() {
  return (
    <>
      <Switch>
        <UserTemplate exact path="/login" Component={Login} />
        <UserTemplate exact path="/resignter" Component={Resignter} />
      </Switch>
    </>
  );
}

export default App;
