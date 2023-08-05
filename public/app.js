document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    } else if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id
        edit(id).then((data) => {
            if (data !== null && data !== undefined) {
                document.getElementById(`${id}_text`).textContent = data
            }
        })
    }
})

async function remove(id) {
    await fetch(`/${id}`, {
        method: 'DELETE'
    })
}

async function edit(id) {
    const newTitle = prompt("Введите новое название")
    if (newTitle !== null && newTitle !== undefined && newTitle.length > 0) {
        await fetch(`/${id}/${newTitle}`, {
            method: 'PUT'
        })
        return newTitle
    }

}