//node .\index.js
const http = require('http')
const url = require('url')
const fs = require('fs')


http.createServer(function (req, res) {
//opcional 1
const tiempo = ()=>{
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    
    if(month < 10){
      return(`${day}-0${month}-${year}`)
    }else{
      return(`${day}-${month}-${year}`)
    }

}

const params = url.parse(req.url, true).query
const archivo = params.archivo
const parametros = params.contenido
const contenido = `${tiempo()} ${parametros}`
const nombre = params.nombre
const nuevoNombre = params.nuevoNombre


if (req.url.includes('/crear')) {
    fs.writeFile(archivo, contenido, () => {
        res.write('Archivo creado con éxito!')
        res.end()
    })
}
if (req.url.includes('/leer')) {
    fs.readFile(archivo, (err, data) => {
        res.write(data)
        res.end()
    })
}
if (req.url.includes('/renombrar')) {
    fs.rename(nombre, nuevoNombre, (err, data) => {
//opcional 2        
        res.write(`Archivo ${nombre} renombrado por ${nuevoNombre}`)
        res.end()
    })
}
if (req.url.includes('/eliminar')) {
    fs.unlink(archivo, (err, data) => {
        res.write(`“Tu solicitud para eliminar el archivo ${archivo} se estáprocesando`)
//opcional 3        
        function tempo() {
            res.write(`    Archivo ${archivo} eliminado con éxito`) 
            res.end()
          }
          setTimeout(tempo, 3000);     
         

    })
}
})
.listen(8080, () => console.log('Escuchando el puerto 8080'))
