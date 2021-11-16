const { ipcRenderer } = require('electron')

const resizeButton = document.getElementById('submit')

function resize() {
	resizeButton.disabled = true
	const width = document.getElementById('width').value
	const height = document.getElementById('height').value
	const files = document.getElementById('files').files
	let paths = []
	for (let i = 0; i < files.length; i++) paths.push(files[i].path)

	ipcRenderer.send('resize', width, height, ...paths)
}

ipcRenderer.on('resized', () => resizeButton.disabled = false)

resizeButton.addEventListener('click', resize)