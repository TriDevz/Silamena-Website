function deleteConfirm(name) {
    if(confirm(`Are you really sure you want to delete the word "${name}"?`)) {
        sendDelete(name);
    }
}
async function sendDelete(name) {
    try{
        await fetch(`http://localhost:3005/api/words/${name}`, { method: 'DELETE' });
        location.reload();
    } catch(e) {
        alert(`Error deleting ${name}, more info in console`);
        console.error(e);
    }
}