import { useParams } from "react-router";


 const PokemonPage = ({pokemons}) => {
    const {name} = useParams();


    
    return (
        <h1>Pokemon name is {name}</h1>
    )
}

export default PokemonPage;