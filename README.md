<div align="center">
<img src="logo.png" alt="Cuarzo Engine Logo" width="320px" />

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Discord](https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord)](https://discord.gg/fnc9WWnY)

</div>

> 🚀 🙉 Introducing Cuarzo Engine, a JavaScript 2D engine with Game Streaming support that enables you to create incredible games quickly and easily. 🕹️💻

### Key Features

- 🚀 **Optimized Performance:** Enjoy smooth and uninterrupted gaming experiences with our cutting-edge performance optimization, specifically tailored for Game Streaming environments.

- 🌐 **Multiplatform:** Create games for web browsers and mobile devices, ensuring a wide reach for your audience, including users of Game Streaming platforms.

- 🛠️ **Intuitive Tools:** Our friendly set of tools makes game development and creation efficient, providing a seamless experience for both developers and streamers.

- 🎨 **Stunning Graphics:** Bring your games to life with high-quality graphics, visual effects, and smooth animations, ensuring visually appealing experiences even during streaming.

- 🧩 **Flexibility and Customization:** Adapt the engine to your specific needs with its modular architecture and customization capabilities, allowing you to create unique and exciting games for streaming.

### Documentation

Refer to our comprehensive [documentation](https://github.com/gabriedev/cuarzo-docs) for detailed instructions, examples, and usage guides specifically designed for Game Streaming compatibility. Take advantage of the available resources to create attractive and streaming-ready games.

### Example

Discover the power of Cuarzo Engine with our simple example to start creating games quickly and easily! We have several example projects available in the [Cuarzo Engine repository.](https://github.com/gabriedev/cuarzo) Here's a simple starting example:

```js
import { Cuarzo } from 'cuarzo/core'
import { Area2D } from 'cuarzo/node/area2D'
import { Sprite } from 'cuarzo/sprite'

Cuarzo.init()

const character = new Area2D('character') // Create the area for the game character
Sprite('sprite_name', character, 'ruta_a_la_imagen_del_personaje.png') // Create the character's sprite

Cuarzo.onLoaded(() => {
  // Mount the objects in the game area
  Cuarzo.mount([character])
})
```

In this example, the Cuarzo Engine provides you with a minimalist structure to bring your games to life. With just a few lines of code, you can create a relative area that contains a character. Using the **Area2D** module, you can define a container with the properties your character needs to be represented in the game. Then, with the **Sprite** module, you can assign an image to the character to give it a visual appearance.

The Cuarzo Engine is initialized by calling **Cuarzo.init()**, and once all the internal resources are loaded using **Cuarzo.onLoaded()**, you can mount the character in the game area using **Cuarzo.mount([character])**.

This example is just the beginning of what you can achieve with the Cuarzo Engine. Use it as a starting point to create your own 2D games easily and efficiently. We encourage you to explore more in our Cuarzo Engine repository and join our community, where you can receive support, share your creations, and collaborate with other developers.

### Contribution

We are open to collaborations and improvements! If you would like to contribute to Cuarzo Engine, please review our [contribution guidelines](CONTRIBUTING.md) for more information on how you can collaborate with us.

### License

This documentation and each page it contains are published under the terms of the [Creative Commons Attribution 3.0 License (CC BY 3.0)](https://creativecommons.org/licenses/by/3.0/), with attribution to "César Leañez, the Cuarzo development team, and its community."

By contributing to the documentation in the GitHub repository, you agree that your changes will be distributed under this license.

### Community

Join our community on [Discord](https://discord.gg/fnc9WWnY) to connect with other developers and streamers, share ideas, get help, and keep us updated on your projects and streaming experiences.

We look forward to seeing you soon, creating exciting games and streaming them live with Cuarzo Engine!
