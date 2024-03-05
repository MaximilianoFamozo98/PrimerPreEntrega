const socket = io();

socket.on('message-all', (data) => {
    console.log(data);
    render(data)
    let chat = document.getElementById("caja");
    chat.scrollTop = chat.scrollHeight;
});

const render  = (data) => {
    const html = data.map(elem => {
        return (
            `
            <div>
            <strong>${elem.author}</strong> dice <em>${elem.text}</em>
            </div> 
            `
        )
    }).join('');

    document.getElementById("caja").innerHTML = html;
}

const addMensage = () => {
    const msg = {
        author: document.getElementById("name").value,    
        text: document.getElementById("text").value
    }
    socket.emit("new-message", msg);
    return false
}