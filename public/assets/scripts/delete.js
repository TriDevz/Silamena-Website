function deleteConfirm(name) {
    if(confirm(`Are you really sure you want to delete the word "${name}"?`)) {
        sendDelete(name);
    }
}

async function sendDelete(name) {
    try{
        await fetch(`/delete-word/${name}`, { method: 'GET' });
        location.reload();
    } catch(e) {
        alert(`Error deleting ${name}, more info in console`);
        console.error(e);
    }
}
