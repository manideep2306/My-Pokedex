import {useState} from 'react';
function Favorite() {
  const [favs,setFavs]=useState(function(){
    const value=localStorage.getItem('pokemons');
    if(value)
    {
      return JSON.parse(value);
    }
    return [];
  });
  return favs.length? <>
  <h3>Your Favorite Pokemons</h3>
  {favs.map((pok)=>{
    return <div>{pok}</div>;
  })}
  </>:null;

}
export {Favorite};
