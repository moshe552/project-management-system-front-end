import ItemUser from './ItemUser'
import SettingsData from './SettingsData'
import List from '@mui/material/List';


function createUser(user) {
 
  return (  <ItemUser
            name={user.name}
            age={user.age}
            text={user.text} />   
  );
}

export default function ListUsers() {

  return (
    <List sx={{ width: '100%', maxWidth: "100%", bgcolor: '#21213E',color: '#FFFFFF' }}>
 
      {SettingsData.map(createUser)}

    </List>
  );
}