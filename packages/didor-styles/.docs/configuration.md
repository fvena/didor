# Configuración

Configurar Didor con los parámetros de tu proyecto es muy fácil. Existen dos formas según el tipo de instalación:

## Instalación mediante CDN

Al ser una versión ya compilada, las opciones de personalización son más limitadas. Unicamente podrás sobreescribir las variables css para adaptar el estilo a tu proyecto.

Simplemente define las variables que quieras cambiar dentro del pseudo elemento `:root` en tu CSS. Para ver un listado completo de las variables disponibles, inspecciona la etiqueta HTML después de instalar Didor.

```css
:root {
  --font-base: 'Source Sans Pro', Helvetica Neue, Arial, sans-serif;
  --font-h1: 2.24rem;
}
```

## Instalación como módulo Sass

Puedes personalizar todos los parámetros de Didor Styles utilizando el nuevo método para [configurar módulos](https://sass-lang.com/documentation/at-rules/use#configuration) de sass-dart.

Carga el módulo Didor en tu archivo principal sass y define los parámetros que quieras configurar dentro de la variable `$config`.

```scss
/* prettier-ignore */
@use "didor" as * with (
  $config: (
    prefix: 'mi-proyecto',
    css-variables: true,
    important: true,
    font-families: (
      base: ("Source Sans Pro", Helvetica Neue, Arial, sans-serif),
      header: ("Source Sans Pro", Helvetica Neue, Arial, sans-serif),
      mono: ("Fira Code", "Courier New", Courier, monospace),
    )
  )
);
```

## Controlando el tamaño del archivo

Debido a su naturaleza de generar multitud de clases de bajo nivel, los frameworks Utility-first suelen tener un gran tamaño. Sin embargo, Didor Styles permite controlar que grupos de clases quieres utilizar y cuales no mediante las propiedades `includes` y `excludes`.

Yo personalmente solo suelo utilizar las clases relacionados con los colores, textos, tamaños y márgenes, utilizando la siguiente configuración:

```scss
/* prettier-ignore */
@use "didor" as * with (
  $config: (
    includes: (colors, types, sizes),
  )
);
```

También puedes mejorar el resultado utilizando herramientas de terceros como [PurgeCSS](https://purgecss.com), que elimina todas las clases que no están siendo utilizadas.

## Configuración

Por último, pero no menos importante, debemos asegurarnos que nuestro archivo `_variables.scss` se importe antes que los archivos de Didor.

### Utilizando `@vue/cli`

Primero, instalaremos un plugin para importar recursos css:

```shell
npm install --save-dev vue-cli-plugin-style-resources-loader
```

Añade el siguiente código en el campo `pluginOptions` de tu archivo `vue.config.js`:

```js[vue.config.js]
const path = require('path');

module.exports = {

    // ... Otros parámetros de configuración

    transpileDependencies: ["@didor/didor"],
    pluginOptions: {
        'style-resources-loader': {
            'preProcessor': 'scss',
            'patterns': [
                path.resolve(__dirname, 'ruta/a/variables.scss'),
            ]
        }
    }
}
```

### Utilizando `webpack`

Asegúrate de tener `sass-loader` instalado y añade la siguiente configuración en tu archivo `webpack.config.js`:

```js[webpack.config.js]
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules(?!\/@didor\/didor)/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            import: [
                                path.resolve(__dirname, 'ruta/a/variables.scss')
                            ]
                        },
                    },
                ],
            }
        ],
    },
}
```
