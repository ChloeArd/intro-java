const server = "http://localhost:3000";
const paragraph = document.querySelector("p");
const hello = document.querySelector("span");

const getServerResponse = async (element, property, url) => {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    element.innerText = jsonResponse[property];
}

getServerResponse(paragraph, 'message', server)
    .catch(err => console.log("Erreur de récup des données depuis '/'."));

getServerResponse(hello, "coucou", server + "/hello")
    .catch(err => console.log("Erreur de récup des données depuis '/hello'"));