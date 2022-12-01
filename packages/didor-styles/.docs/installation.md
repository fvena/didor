# Instalación

Aprende como instalar y comenzar a trabajar con Didor Styles

## Guía de instalación

Es muy fácil comenzar a utilizar y configurar Didor Styles, todo lo que necesitas hacer es añadir Didor como un módulo a tu proyecto con SASS o usar el archivo precompilado CSS.

### Instalación con NPM o Yarn

1. Instala Didor como dependencia con tu gestor de paquetes preferido:

```sh
npm install @didor/styles
```

```sh
yarn add @didor/styles
```

2. Añade el módulo Didor a tu archivo principal sass

```scss
@use 'didor' as *;
```

> Tenga en cuenta que Didor Styles utiliza nuevas funcionalidades de Sass y requiere la versión `1.33.0` o superior de `dart-sass` para compilar correctamente.

### Instalación con CDN

1. Añada la siguiente etiqueta de estilo al header de tu proyecto.

```html
<link href="https://cdn.jsdelivr.net/npm/didor/style@3.0.0/dist/didor.min.css" rel="stylesheet" />
```

> A diferencia de la instalación como módulo sass, el uso de la versión compilada solo te permitirá una personalización limitada, no tendrás acceso a opciones más avanzadas, como prefijos o variantes.

### Clonando el repositorio

1. Clona Didor Styles en el mismo directorio donde se encuentre tu archivo sass principal.

```sh
# Dirigete al directorio donde se encuentra tu archivo sass principal
cd my-project/sass/

# Clona el repositorio
git clone https://github.com/fvena/didor/styles
```

2. Añade el módulo Didor a tu archivo principal sass

```scss
@use 'didor' as *;
```
