<div align="center">
<img src="logo.png" alt="Cuarzo Engine Logo" width="320px" />

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Discord](https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord)](https://discord.gg/fnc9WWnY)

</div>

> 🚀 🙉 Te presento a Cuarzo Engine, un motor 2D de JavaScript con soporte a Game Streaming que te permite crear juegos increíbles de manera rápida y sencilla. 🕹️💻

### Características principales

- 🚀 **Rendimiento optimizado:** Disfruta de juegos fluidos y sin interrupciones gracias a nuestra optimización de rendimiento de vanguardia, especialmente adaptada para entornos de Game Streaming.

- 🌐 **Multiplataforma:** Crea juegos para navegadores web y dispositivos móviles, asegurando un amplio alcance para tu audiencia, incluyendo usuarios de plataformas de Game Streaming.

- 🛠️ **Herramientas intuitivas:** Nuestro conjunto de herramientas amigables facilita el desarrollo y la creación de juegos de forma eficiente, brindando una experiencia fluida tanto para desarrolladores como para streamers.

- 🎨 **Gráficos impresionantes:** Brinda vida a tus juegos con gráficos de alta calidad, efectos visuales y animaciones suaves, asegurando una experiencia visualmente atractiva incluso durante el streaming.

- 🧩 **Flexibilidad y personalización:** Adapta el motor a tus necesidades específicas con su arquitectura modular y capacidad de personalización, permitiéndote crear juegos únicos y emocionantes para el streaming.

### Documentación

Consulta nuestra [documentación](https://github.com/gabriedev/cuarzo-docs) completa para obtener instrucciones detalladas, ejemplos y guías de uso específicamente diseñados para la compatibilidad con Game Streaming. Aprovecha los recursos disponibles para crear juegos atractivos y listos para la transmisión.

### Ejemplo

¡Descubre la potencia del motor Cuarzo con nuestro ejemplo simple para comenzar a crear juegos de forma rápida y sencilla! Tenemos varios proyectos de ejemplos de [repositorio de Cuarzo Engine](https://github.com/gabriedev/cuarzo). Aquí está el primero ejemplo simple para empezar:

```js
import { Cuarzo } from 'cuarzo/core'
import { Area2D } from 'cuarzo/node/area2D'
import { Sprite } from 'cuarzo/sprite'

Cuarzo.init()

const character = new Area2D('character') // Crear el área para el personaje del juego
Sprite('sprite_name', character, 'ruta_a_la_imagen_del_personaje.png') // Crear el Sprite del personaje

Cuarzo.onLoaded(() => {
  // Montar los objetos en el área de juego
  Cuarzo.mount([character])
})
```

En este ejemplo, el motor Cuarzo te ofrece una estructura minimalista para dar vida a tus juegos. Con solo unas pocas líneas de código, puedes crear un área relativa que contenga un personaje. Utilizando el módulo **Area2D**, puedes definir un contenedor con las propiedades que necesita tu personaje para representrase en el juego. Luego, con el módulo **Sprite**, puedes asignar una imagen al personaje para darle una apariencia visual.

El motor Cuarzo se inicializa llamando a **Cuarzo.init()**, y una vez que todos los recursos internos esten cargados mediante **Cuarzo.onLoaded()**, podrás montar el personaje en el área de juego usando **Cuarzo.mount([character]).**

Este ejemplo es solo el comienzo de lo que puedes lograr con el motor Cuarzo. Úsalo como punto de partida para crear tus propios juegos 2D de manera fácil y eficiente. Te animamos a explorar más en nuestro repositorio de Cuarzo Engine y unirte a nuestra comunidad, donde podrás recibir apoyo, compartir tus creaciones y colaborar con otros desarrolladores.

### Contribución

¡Estamos abiertos a colaboraciones y mejoras! Si deseas contribuir a Cuarzo Engine, revisa nuestras [pautas de contribución](CONTRIBUTING_ES.md) para obtener más información sobre cómo puedes colaborar con nosotros.

### Licencia

Esta documentación y cada página que contiene se publica bajo los términos de la [licencia Creative Commons Attribution 3.0 (CC BY 3.0)](https://creativecommons.org/licenses/by/3.0/), con atribución a "César Leañez, el equipo de desarrollo de Cuarzo y su comunidad".

Al contribuir con la documentación en el repositorio de GitHub, acepta que sus cambios se distribuyan bajo esta licencia.

### Comunidad

Únete a nuestra comunidad en [Discord](https://discord.gg/fnc9WWnY) para conectarte con otros desarrolladores y streamers, compartir ideas, obtener ayuda y mantenernos actualizados sobre tus proyectos y experiencias de streaming.

¡Esperamos verte pronto creando juegos emocionantes y transmitiéndolos en vivo con Cuarzo Engine!
