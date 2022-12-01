<p align="center">
  <a href="https://fvena.github.io/didor/docs" target="_blank"><img height="150" src="./public/didor.svg"></a><br>
  Un framework responsive SCSS ligero y flexible para construir interfaces rapidamente.
</p>

<!-- <p align="center">
  <a href="https://travis-ci.org/tailwindcss/tailwindcss"><img src="https://img.shields.io/travis/tailwindcss/tailwindcss/master.svg" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/tailwindcss"><img src="https://img.shields.io/npm/dt/tailwindcss.svg" alt="Total Downloads"></a>
  <a href="https://github.com/tailwindcss/tailwindcss/releases"><img src="https://img.shields.io/npm/v/tailwindcss.svg" alt="Latest Release"></a>
  <a href="https://github.com/tailwindcss/tailwindcss/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/tailwindcss.svg" alt="License"></a>
</p> -->

------

## Documentation

Para ver la documentación completa visita [didor docs](https://fvena.github.io/didor/docs).


## Principios

* Todo debe ser 100% responsive
* Todo debe ser legible en cualquier dispositivo
* Todo debe ser tan rápido como sea possible
* Debe ser fácil diseñar en el navegador
* Debe ser fácil modificar una interfaz o parte de ella sin romper ninguna otra
* Debe ser reutilizable al máximo para reducir la cantidad de código
* Documentar promueve la reutilización y explica como se ha desarrollado
* Debe generar la mínima cantidad de código
* Debe utilizar BEM para nombrar las clases.
* Debe seguir la arquitectura ITCSS para controlar la visualización final.

## Características

<!-- * Permite alternar entre una arquitectura Mobile-first o Desktop-first -->
* Permite compartir interfaces entre proyectos
* Librería de componentes en continuo crecimiento y optimización
* Funciona bien con cualquier framework: vue, react, angular, rails, ...
* Utiliza PostCss y Autoprefixer para generar el CSS.

## Diferencia con otras librerías SCSS

Esta es un micro librería SCSS que te ayudará a construir aplicaciones:

&nbsp; &nbsp; ✓ Solo 32.9 kB (8.2 kB gzipped)<br>
&nbsp; &nbsp; ✓ Modular<br>
&nbsp; &nbsp; ✓ Personaliza colores, bordes, tamaños & fuentes<br>
&nbsp; &nbsp; ✓ Responsive

## Instalación

Puedes instalar Didor en tu proyecto mediante npm o yarn:

```bash
npm install @didor/styles --save-dev
```

```bash
yarn add @didor/styles
```

## Añadir Didor a nuestro proyecto

La mejor forma de añadir Didor a tu proyecto es importarlo directamente en tu archivo Sass/Scss principal. De esta manera tendrás más control del orden de los estilos y podrás utilizar las herramientas que incorporan.

```scss
@import '@didor/lib/index';
```

O directamente en el html

```html
<link rel="stylesheet" href="dist/didor.min.css">
```

## Personalización

Para facilitar la personalización en frameworks formados por componentes con su propio scope, tipo vue, react o angular, todas las variables configurables se han creado con variables nativas css, de esta forma las podrás editar y utlizar desde qualquier sitio.

Si quieres personalizar los estilos de la librería Didor, te recomiendo que modifiques las variables **después** de haber importado los archivos de didor:

```scss
@import '@didor/scss/src/didor';

:root {
  --border-radius: 10px;
  --border-color: ##2ecc71;
}
```

#### Ejemplos

En los siguientes ejemplos, se muestra un ejemplo personalizando los valores mínimos recomendados, y en el otro, aparecen todas las variables disponibles:

[Ejemplo con la personalización mínima recomendada](/examples/vars_min.scss)

[Ejemplo con todas las opciones de personalización disponibles](/examples/vars_all.scss)

## Actualizaciones

Mantente informado de las actualizaciones siguiendo mi cuenta de Twitter [@fvena](https://twitter.com/fvena).

## Versionado

Para que haya transparencia en nuestro flujo de actualizaciones y para mantener la compatibilidad con versiones anteriores, didorscss sigue un Versionado semántico.

Puedes ir a la sección release de nuestro proyecto en GitHub o mirar el archivo `CHANGELOG.md` para comprobar todos los cambios realizados en cada versión.

## Contribuciones

Este proyecto es y será siempre de código abierto. Eres bienvenido si quieres contribuir a su desarrollo y mejorarlo cada vez más. Para ello, tienes varias posibilidades:

- [Remitiendo errores](https://github.com/fvena/didor-scss/blob/master/CONTRIBUTE.md#remitiendo-errores)
- [Añadiendo nueva funcionalidad](https://github.com/fvena/didor-scss/blob/master/CONTRIBUTE.md#a%C3%B1adiendo-nueva-funcionalidad)
- [Compartiendo en redes sociales](https://github.com/fvena/didor-scss/blob/master/CONTRIBUTE.md#compartiendo-en-redes-sociales-%EF%B8%8F)
- [Conviértiendote en un colaborador oficial](https://github.com/fvena/didor-scss/blob/master/CONTRIBUTE.md#convi%C3%A9rtiendote-en-un-colaborador-oficial)
- [Haciendo una pequeña donación](https://github.com/fvena/didor-scss/blob/master/CONTRIBUTE.md#haciendo-una-peque%C3%B1a-donaci%C3%B3n)


## Licencia

El código está disponible bajo la licencia MIT. Esto significa que puedes usarlo, modificarlo o hacer lo que quieras con él. Esto también significa que se lo ofrecemos de forma gratuita, así que no lo critique, si encuentra algún error, etc., siéntase libre de contribuir o cominicarlo.

------
Desarrollado por [Francisco Vena](https://fvena.github.io/) ([@fvena](https://twitter.com/fvena)).
