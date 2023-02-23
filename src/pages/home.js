import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete'; //giving suggestions while searching
import Button from '@material-ui/core/Button';
import {pokemons} from '../pokemonList';
import {PokemonGallery} from '../components/PokemonGallery';
import {Link} from 'react-router-dom';
import {Favorite} from '../components/favorite';
import {useState} from 'react';
function HomePage(){
  const [selection,setSelection]=useState(null); // to get from textfield
 return <>
 <div style={{marginTop:'20px',display:'flex'}}>
<Autocomplete
id="combo-box-demo"
options={pokemons}
getOptionLabel={(option)=>{
const {name}=option;
return name[0].toUpperCase()+name.substr(1);
}}
style={{ width: 300, flexGrow:1,marginRight:'20px',backgroundColor:'#292929',borderRadius:'5px' }}
onChange={function(event,selection){
setSelection(selection);
}}
renderInput={(params) => <TextField {...params}  InputProps={{...params.InputProps,style:{color:'white',marginLeft:'10px'}}} label="Search Pokemons" style={{color:'white'}} InputLabelProps={{style:{color:'white',left:"20px",top:'-5px'}}}  />}/>
<Link to={selection ? '/pokemon/'+selection.name : '/'} component={function(props){
  return <Button variant="contained" color="white" {...props}/>
}}> Go to Pokemon</Link>
</div>
<Favorite/>
<center><h3 style={{fontStyle:'italic'}}>Pokemon Gallery</h3></center>
<PokemonGallery/></>
}
export {HomePage};
