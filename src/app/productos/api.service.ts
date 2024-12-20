import { Injectable } from '@angular/core';
import { Producto } from '../producto.model'; // Importamos el modelo del producto

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://dummyjson.com/products'; // URL base de la API

  constructor() {}

  // Obtener todos los productos
  getProductos(): Promise<Producto[]> {
    return fetch(`${this.apiUrl}`) // Realiza la petición a la API
      .then((response) => response.json()) // Convierte la respuesta en JSON
      .then((data) => data.products) // Devuelve la lista de productos
      .catch((error) => {
        console.error('Error al obtener los productos: ', error); // Manejo de errores
        return [];
      });
  }

  // Obtener un producto por ID
  getProductoById(id: number): Promise<Producto | null> {
    return fetch(`${this.apiUrl}/${id}`) // Realiza la petición por ID
      .then((response) => response.json()) // Convierte la respuesta en JSON
      .then((data) => {
        if (Array.isArray(data.images) && data.images.length > 0) {
          data.image = data.images[0]; // Asigna la primera imagen del array si existe
        } else {
          data.image = null; // Asigna null si no hay imágenes
        }
        return data;
      })
      .catch((error) => {
        console.error('Error al obtener el producto: ', error); // Manejo de errores
        return null;
      });
  }

  // Buscar productos por tag
  buscarProductosPorTag(tag: string): Promise<any[]> {
    return fetch(`${this.apiUrl}/search?q=${tag}`) // Realiza la búsqueda con el tag
      .then((response) => response.json()) // Convierte la respuesta en JSON
      .then((data) => {
        console.log('Productos encontrados por tag:', data); // Muestra los resultados en consola
        return data.products || []; // Devuelve los productos encontrados o un array vacío
      })
      .catch((error) => {
        console.error('Error al buscar productos: ', error); // Manejo de errores
        return [];
      });
  }

  // Eliminar un producto
  eliminarProducto(id: number): Promise<any> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE', // Método DELETE para eliminar
    })
      .then((response) => response.json()) // Devuelve la respuesta como JSON
      .catch((error) => {
        console.error('Error al eliminar el producto:', error); // Manejo de errores
        return null;
      });
  }
}

