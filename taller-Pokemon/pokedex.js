async function buscarPokemon(nombre) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`;

    const pokemon = await fetch(url)
    
    if (!pokemon.ok){
        console.log("Algo salió mal. Codigo:", pokemon.status);
        return;
    }    
    const datos = await pokemon.json();
    return datos;
}

async function probarF() {
    const datos = await buscarPokemon("IVYSAUR");
    console.log(datos)
    mostrarFicha(datos)
}
   

function mostrarFicha(datos){
    if (!datos){  ///Si no hay datos retorna (creo (ojala y si))
        return;
    }    

    //let nombreMayusq = datos.name.toUpperCase();
    console.log(datos.name.toUpperCase(), datos.id);
    //for para recorer tipos?
    let tipos = [];
    for(let i of datos.types){
        tipos.push(i.type.name);

    }
    console.log(tipos.join(" / "));
    console.log(datos.height * 10);
    console.log(datos.weight/10); 

    for(let j of datos.stats){
        console.log(j.stat.name);
        console.log(j.base_stat);
    }

    for (let k of datos.abilities){
        if(k.is_hidden==true){
            console.log(k.ability.name, k.ability.is_hidden);
        }
        else{
            console.log(k.ability.name);
        }
    }


}
console.log(probarF());


function obtenerStats(datos,nombreStat){
    for(let i of datos.stats){
        if(i.stat.name===nombreStat){
            return i.base_stat;
        }
    }
    return null

}

async function compararStats(nombrePokemon1,nombrePokemon2,nombreStat){
    const datosPokemon1= await buscarPokemon(nombrePokemon1);
    const datosPokemon2= await buscarPokemon(nombrePokemon2);

    if(!datosPokemon1 || !datosPokemon2){
        console.log("No se encontró ningun pokemon" );
        return;
    }
    
    const valor1 = obtenerStats(datosPokemon1,nombreStat);
    const valor2 = obtenerStats(datosPokemon2,nombreStat);

    if(valor1=== null || valor2=== null){
        console.log("No existe");
        return;
    }
    if (valor1>valor2){
        console.log(nombrePokemon1, "tiene más", nombreStat,": ", valor1);
    }else if(valor2>valor1){
        console.log(nombrePokemon2, "tiene más", nombreStat,": ", valor2);
    }else{
        console.log("ambos tienen el mismo ",nombreStat,valor1)
    }

}

compararStats("pikachu", "charizard", "speed");

async function compararPokemon(nombrePokemon1,nombrePokemon2,stat){
    const datosPokemon1 = await buscarPokemon(nombrePokemon1);
    const datosPokemon2 = await buscarPokemon(nombrePokemon2);

    if(datosPokemon1 === null || datosPokemon2=== null){
        console.log("no es posible la comparacion, mala");
        return; 
    }
    const valor1= obtenerStats(datosPokemon1,stat);
    const valor2= obtenerStats(datosPokemon2,stat);
    if(valor1 === null || valor2 === null){
        console.log("la stat no existe");
        return;
    }

    if (valor1>valor2){
        console.log(nombrePokemon1, "tiene más", stat,": ", valor1);
    }else if(valor2>valor1){
        console.log(nombrePokemon2, "tiene más", stat,": ", valor2);
    }else{
        console.log("ambos tienen el mismo ",stat,valor1)
    }
    
}
//ejercicio 1
compararPokemon("snorlax", "machamp", "attack");

//ejercicio 2
compararPokemon("bulbasaur", "raticate", "defense");

//ejercicio 3
compararPokemon("bulbasaur", "raticate", "locura");


async function pokemonMasFuerte(nombres,stat){
    let mejorNombre;
    let mejorValor=-1;
    
    for(let i of nombres){
        const datos = await buscarPokemon(i);
    
        if(datos === null){
            continue;
        }
        let valorStat = obtenerStats(datos, stat);
        if(valorStat===null){
            continue;
        }
        if(valorStat> mejorValor){
            mejorValor= valorStat
            mejorNombre=i
        }
    }

    console.log("El pokemon mas fuerte es: ",mejorNombre);  
    return mejorNombre;




}

const equipo= ["mew","simisear","glaceon","gengar","ditto","chimchar"];
const ganadorAttack = await pokemonMasFuerte(equipo, "attack");
const ganadorDefense = await pokemonMasFuerte(equipo, "defense");

const datosGanador = await buscarPokemon(ganadorAttack);
mostrarFicha(datosGanador);
