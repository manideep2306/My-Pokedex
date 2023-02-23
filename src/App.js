//components folders is to store reusable components like PokemonGallery(9 photos). Api folder is to do browser things like fetch info from url.
//pages folder to store the webpages that we show in our website like home page.
//In the homepage we will have searchbox& random 9 photos if we click then it leads another page of containing info about that pokemon.
//to look like multipage website we using routing(but actually single page website).
import './App.css';
import {useEffect} from 'react';
import {useState} from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress'; //for loading symbol
import {Route,Switch,useParams} from 'react-router-dom'; // for mulitpage
import {HomePage} from './pages/home';
import {PokeApi} from './api/pokiapi'; // to fetch
import {Header} from './components/header';
function getImageFromData(data){
  const defaultImage='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8c1278f2-6f53-4727-b803-1a4c297c191f/dapbbed-30642074-7c2d-43c2-ad05-be7bc0f0089a.png/v1/fill/w_1600,h_1600,strp/original_pokeball_vector_by_greenmachine987_dapbbed-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYwMCIsInBhdGgiOiJcL2ZcLzhjMTI3OGYyLTZmNTMtNDcyNy1iODAzLTFhNGMyOTdjMTkxZlwvZGFwYmJlZC0zMDY0MjA3NC03YzJkLTQzYzItYWQwNS1iZTdiYzBmMDA4OWEucG5nIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.cisWXCiz7JCdLjr-HzGGsjoQUsGf6StVLVGStptev20';
  const {sprites:{other},}=data
  const officialArtwork=other['official-artwork'];
  return officialArtwork['front_default'];
}
function Pokemon(props){
  const {data}=props

  return <div style={{
    width:'100%',
    backgroundColor:'white',
    color:'black',
    height:'450px'
  }}>
  <img src={getImageFromData(data)}  style={{position:"relative",bottom:"-70px"}}width={400} height={350} alt='pokeball' />
  <div style={{position:'relative',left:"450px",bottom:'200px',fontSize:'22px'}}>
  <div><b>Id: </b>{data.id}</div>
  <div style={{margin:"10px 0px 10px 0px"}}><b>Base Experience: </b>{data.base_experience}</div>
  <div><b>Weight: </b>{data.weight}</div>
  <div style={{margin:"10px 0px 10px 0px"}}><b>Height: </b>{data.height}</div>
  <div><b>Order: </b>{data.order}</div>
  </div>
  </div>
}
function PokemonPage(){
  const params=useParams(); // getting values from link of the page
  const [isLoading,setIsLoading]=useState(true);
  const [pokemonData,setPokemonData]=useState(null);
  const [isError,setIsError]=useState(false);
  useEffect(function(){
    PokeApi.getPokemonByName(params.name)
    .then((data)=>{
    setIsLoading(false);
    setPokemonData(data)
  })
  .catch(()=>{
    setIsLoading(false);
    setIsError(true);
  });
},[]);
  if(isLoading){
    return <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100vh',
    }}
    >
            <CircularProgress color="secondary"/>
            </div>;
  }
  if(isError)
  {
    return <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100vh',
    }}
    >
          Network error, try after some time.
            </div>;
  }
  return <>
    <center><div style={{fontFamily:"sans-serif",margin:"35px 0px 15px 0px"}}>More data for <h3>{params.name}</h3></div></center>
    <Pokemon data={pokemonData}/>
    </>;
}
function App() {
  return (<>
    <Container >
     <Header/>
     <Switch>
     <Route exact path="/">
      <HomePage/>
      </Route>
      <Route exact path="/pokemon/:name">
       <PokemonPage/>
      </Route>
      <Route>
      <h1>No match</h1>
      </Route>
      </Switch>
      </Container>
      </>
   );
}

export default App;
