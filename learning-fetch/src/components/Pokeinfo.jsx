import "./Pokeinfo.css"

function Pokeinfo({pokeData}) {

    function extractInfo(infoArray, fieldName){
        return (infoArray.map((object)=>{
            if (object != infoArray[infoArray.length-1])
            {
                return (object[fieldName].name + ", ")
            }
            return (object[fieldName].name)
        }))
    }

    return (
        <div className="pokemon-container">
            <img src={pokeData.sprites.front_default}></img>
            <div className="info-container">
            <h2>{pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1).toLowerCase()}</h2>
            <p>Type{pokeData.types.length <= 1 ? "" : "s"}: {extractInfo(pokeData.types, "type")}</p>
            <p>Abilit{pokeData.abilities.length <= 1 ? "y" : "ies"}: {extractInfo(pokeData.abilities, "ability")}</p>
            <p>Held Item{pokeData.held_items.length <= 1 ? "" : "s"}: {
                pokeData.held_items.length === 0 ? "None" : extractInfo(pokeData.held_items, "item")
            }</p>
            </div>
        </div>
    );
}

export default Pokeinfo;