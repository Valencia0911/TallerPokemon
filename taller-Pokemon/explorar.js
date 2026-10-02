async function conexion() {
    const pokemon = await fetch ("https://pokeapi.co/api/v2/pokemon/ivysaur");
    if (!pokemon.ok) {
    console.log("Algo salió mal. Código:", pokemon.status);
    return;
    }
    const datos = await pokemon.json();
    console.log("Su pokemon es: ", datos);

    ///// FOR PARA SABER EL TIPO ////
    
    for (let t of datos.types) {
        console.log("Tipo: ", t.type.name);
    }

    for (let s of datos.stats) {
        console.log(s.stat.name, " : ",s.base_stat);
    }

    for(let a of datos.abilities){
        console.log("prueba de ver q es: " , a.ability.name);
    }
}
conexion();

async function buscarPokemon(nombre) {
    return datos
}