function deleteConfirm(name) {
    if(confirm(`Are you really sure you want to delete the word "${name}"?`)) {
        sendDelete(name);
    }
}
const URL = "https://eu-silamena-api-5a163c1570be.herokuapp.com";

async function sendDelete(name) {
    try{
        await fetch(URL + `/api/words/${name}`, { method: 'DELETE' });
        location.reload();
    } catch(e) {
        alert(`Error deleting ${name}, more info in console`);
        console.error(e);
    }
}