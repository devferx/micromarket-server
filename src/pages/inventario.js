import React, { useEffect, useState } from 'react'
import styles from '@/styles/Inventario.module.css'

const CATEGORIAS = [
  {
    id: 1,
    nombre: "Limpieza"
  },
  {
    id: 2,
    nombre: "Cocina"
  }
]

const PRODUCTOS = [
  {
    id: 1,
    nombre: "Detergente",
    descripcion: "El mejor detergente",
    precio: 20,
    cantidad: 5,
    idCategoria: 1
  },
  {
    id: 2,
    nombre: "Shampoo",
    descripcion: "El mejor shampoo",
    precio: 25,
    cantidad: 3,
    idCategoria: 1
  },
  {
    id: 3,
    nombre: "Aceite",
    descripcion: "El mejor aceite",
    precio: 15,
    cantidad: 9,
    idCategoria: 2
  },
  {
    id: 4,
    nombre: "Harina",
    descripcion: "La mejor harina",
    precio: 10,
    cantidad: 7,
    idCategoria: 2
  },
]

const Inventario = () => {
  const [productos, setProductos] = useState(PRODUCTOS);
  const [categorias, setCategorias] = useState(CATEGORIAS);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);
  const [ultVezActualizado, setUltVezActualizado] = useState(new Date());

  const actualizar = () => {
    /* llamar a backend y actualizar los productos con setProductos */
    setUltVezActualizado(new Date());
  }

  const filtrarPorCategoria = (event) => {
    const nuevaCategoria = event.target.value;
    setCategoriaSeleccionada(nuevaCategoria);
    if (nuevaCategoria == 0) {
      setProductos(PRODUCTOS);
      return;
    }
    const productosFiltrados = PRODUCTOS.filter((producto) => producto.idCategoria == nuevaCategoria);
    setProductos(productosFiltrados);
  };

  return (
    <div className="container">
      <div className={`row ${styles.mb10}`}>
        <div className="col-md-12">
          <h3>Inventario</h3>
        </div>
      </div>
      <div className={`row ${styles.mb10}`}>
        <div className="col-md-9">
          <select value={categoriaSeleccionada} onChange={filtrarPorCategoria} className="form-select" aria-label="Default select example">
            <option value={0}>Todos los Productos</option>
            {categorias.map(categoria => {
              return <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
            })}
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary">Generar reporte</button>
        </div>
      </div>
      <div className={`row ${styles.mb10}`}>
        <div className="col-md-12">
          <button onClick={actualizar} className={`btn btn-primary ${styles.mr10}`}>Actualizar datos</button>
          <span>Ultima vez actualizado a las {ultVezActualizado.toTimeString().split(' ')[0]}</span>
        </div>
      </div>
      <div className={`row ${styles.mb10}`}>
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nro.</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => {
                return (
                  <tr key={producto.id}>
                    <td>{index + 1}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.descripcion}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.cantidad}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Inventario