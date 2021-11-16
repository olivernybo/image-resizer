const { app, BrowserWindow, ipcMain } = require('electron')
const sharp = require('sharp')

function createWindow () {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
		}
	})

	win.loadFile('index.html')
}

app.whenReady().then(() => {
	ipcMain.on('resize', (event, width, height, ...filePaths) => {
		width = parseInt(width)
		height = parseInt(height)
		for (const filePath of filePaths) {
			const pos = filePath.lastIndexOf('.')
			const ext = filePath.substring(pos)
			const newFilePath = filePath.substring(0, pos) + '_resized' + ext
			sharp(filePath).resize(width, height).toFile(newFilePath)
		}

		ipcMain.emit('resized', true)
	})
	createWindow()
})