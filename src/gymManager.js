var fs=require('fs')

class GymManager {
  constructor() {
    try {
      var json_db=fs.readFileSync('database.json', 'utf8');
      this.db=JSON.parse(json_db);
    } catch (error){
      var json_db = {clientes:[{nombre:"Iván",apellidos:"Garzón Segura",dni:"1234567S",email:"ivangarzon98@correo.ugr.es",id: 1}]};
      fs.writeFile('database.json', JSON.stringify(json_db, null, 2), function(err) {
        if (err) {
          console.log('Error de escritura');
        }
      });
      this.db=json_db;
    }

    this.num_clientes = this.db["clientes"].length;
  }

  save(path) {
    fs.writeFile('database.json', JSON.stringify(this.db, null, 2), function(err) {
      if (err) {
        console.log('Error de escritura');
      }
    });
  }

  insertarCliente(cliente) {
    cliente["id"] = this.num_clientes + 1;
    this.db["clientes"].push(cliente);
    this.num_clientes += 1;
  }

  eliminarCliente(id) {
    encontrado = false;

    for (var i = 0; i < this.db["clientes"].length && !encontrado; i++) {
      if (this.db["clientes"][i]["id"] == id) {
        this.db["clientes"].splice(i,1);
        encontrado = true;
      }
    }

    if (!encontrado) {
      return false;
    }else {
      return true;
    }
  }

  listarClientes() {
    return this.db["clientes"];
  }

  getCliente(id) {
    for (var i = 0; i < this.db["clientes"].length; i++) {
      if (this.db["clientes"][i]["id"] == id) {
        return this.db["clientes"][i];
      }
    }
    return null;
  }
}

var clientes = new GymManager();

var nuevo_cliente = {nombre:"Antonio",apellidos:"Papaya Telescopio",dni:"1234567S",email:"ivangarzon98@correo.ugr.es"};
clientes.insertarCliente(nuevo_cliente);

console.log(clientes.listarClientes());