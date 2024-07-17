function deleteConfirm(name) {
    if(confirm(`Are you really sure you want to delete the word "${name}"?`)) {
        sendDelete(name);
    }
}
const URL = "https://mild-mureil-tridevs-6ffae980.koyeb.app/";

async function sendDelete(name) {
    try{
        await fetch(URL + `/api/words/${name}`, { method: 'DELETE' });
        location.reload();
    } catch(e) {
        alert(`Error deleting ${name}, more info in console`);
        console.error(e);
    }
}
