import {pokemons} from '../pokemonList';
import sampleSize from 'lodash/sampleSize';//to get random
import {Link} from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import {useState} from 'react';
function GalleryItem(props){
  const {children,pokemonName}=props;
  const [isInLocalStorage,setIsInLocalStorage]=useState(function(){
    const val=localStorage.getItem('pokemons');
    if(!val)
    return false;
  const array=JSON.parse(val);
  const set=new Set(array);
  return set.has(pokemonName);
  });
  return <div style={{
    border: '1px solid white',
    boxShadow:'0 0 5px white',
    borderRadius:'10px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  }}>
  <div style={{flexGrow:1}}>{children}</div>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/345px-Pokebola-pokeball-png-0.png"
   style={{height:'50px',flexGrow:2}}alt="demo"></img>
  <Button onClick={
    function(){
      if(!isInLocalStorage)
      {
      setIsInLocalStorage(true);
      const key='pokemons';
      const val=localStorage.getItem(key);
      if(val)
      {
      const arr=JSON.parse(val);
      arr.push(pokemonName);
      const stringifiedArray=JSON.stringify(arr);
    localStorage.setItem(key,stringifiedArray);
      }
      else
      {
        const stringifiedArray=JSON.stringify([pokemonName]);
      localStorage.setItem(key,stringifiedArray);
    }
    }
  }} variant="contained" color={isInLocalStorage?'secondary':'pink'} style={{height:'20px',margin:'4px'}}>
  <FavoriteIcon/>
  </Button>
  </div>;
}
function PokemonGallery(){
  const random=sampleSize(pokemons,9);
  return <div style={{display:'grid'
  ,gridTemplateColumns:'repeat(3,1fr)',
  gridTemplateRows:'1fr 1fr 1fr',
  height:'400px',
  gridGap:'10px',}}>
  {random.map(pokemon=>{
    const {name}=pokemon;
    return <GalleryItem key={name} pokemonName={name}>
     <Link to={'/pokemon/'+name} style={{color:"white"}}>{name}</Link>
    </GalleryItem>//passing link as children
  })
}
  </div>
}
export {PokemonGallery};
