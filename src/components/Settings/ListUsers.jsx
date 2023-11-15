
import ItemUser from './ItemUser'
import SettingsData from './SettingsData'
import List from '@mui/material/List';

function createUser(aaa) {
  return  <ItemUser name={aaa.name} age={aaa.age} text={aaa.text} />   
  }

export default function ListUsers() {

 


  return (
    <List sx={{ width: '100%', maxWidth: "100%", bgcolor: '#21213E',color: '#FFFFFF' }}>
      
      {SettingsData.map(createUser)}


    </List>
  );
}