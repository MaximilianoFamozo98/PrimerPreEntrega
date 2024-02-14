const socket = io();

//socket.on ("mensaje", (data) => {
//    console.log(data)
//    socket.emit("mensaje2", "Hola Servidor, muchas gracias")
//})

socket.on("mensajesDelChat", (data)=>{
    console.log(data)
    render (data)
})

const render = (data) => {
  let html =  data.map(elem => {
        return(
            `<div>
            <strong> ${elem.nombre} </strong>
            <em> ${elem.text} </em>
            </div>`
        )
    }).join(" ")

    document.getElementById("caja").innerHTML = html

}



const addMensages = () => {
    const msj = {
        nombre: document.getElementById("nombre").value, //<input>
        text: document.getElementById("texto").value,
    }
    console.log(msj)

    socket.emit("messajenuevo", msj)

    return false
}
