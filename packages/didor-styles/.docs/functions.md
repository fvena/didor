# Api Funciones

Si has instalado Didor Styles como módulo sass, tendrás acceso a varias funciones de ayuda para acceder directamente a los valores de las variables de tu proyecto de forma más rápida.

Algunos valores de tus estilos son generados de forma automática al compilar tu proyecto, para poder acceder a ellos o las variables css, he creado algunas funciones que ayudan a obtener estos datos.

```scss
.element {
  margin-bottom: size(2); // 3.2rem
  padding: simple() double(); // 1.6rem 3.2rem
  background: color(brand, 30); // rgba(221,34,78,0.2)
  font-size: font(h2); // 1.907rem
  font-weight: font(semibold); // 500
  color: color(white); // rgba(255,255,255,1)
}
```

## Colores

Hay dos funciones disponibles para obtener los colores: `color()` devuelve el color indicado de nuestra configuración, y `gradient()` devuelve un degrado predefinido o con los valores indicados.

### color(color, opacity)

La función `color()` devuelve el color indicado en formato rgba, admite dos parámetros el nombre del color que debe corresponderse con alguno de colores configurados y la opacidad. Este segundo parámetro es optativo, sino se indica se considera una opacidad el 100%.

Si tenemos configuradas las variables CSS (opción por defecto), el color generado incluirá el nombre de la variable que representa.

```scss
// css-variables: true,
.element {
  background: color(brand, 30); // rgba(var(--brand),0.2)
  color: color(white); // rgba(var(--white),1)
}

//css-variables: false,
.element {
  background: color(brand, 30); // rgba(221,34,78,0.2)
  color: color(white); // rgba(255,255,255,1)
}
```

### gradient(name,type) | gradient(color1,color2,type)

La función `gradient()` devuelve un degrado entre dos colores. Esta función admite el nombre de un degradado definido en la configuración o el nombre de los dos colores que conformarán el degradado (pueden ser uno de los colores predefinidos o colores en hexadecimal). Por otro lado acepta de forma optativa el nombre del tipo de degradado (linear, radial o conic).

Si tenemos configuradas las variables CSS (opción por defecto), el color generado incluirá el nombre de la variable que representa.

```scss
// css-variables: true,
.element1 {
  background: gradient(brand);
  // linear-gradient(to down, var(--brand-light) 0%, var(--brand-dark) 100%)
}

.element2 {
  background: gradient(danger, warning, radial);
  // radial-gradient(ellipse at left top, var(--danger) 0%, var(--warning) 100%)
}

.element3 {
  background: gradient(#ffd780, #e69d00);
  // linear-gradient(to down, #ffd780 0%, #e69d00 100%);
}
```

> Podemos modificar el tipo de degradado por defecto mediante la propiedad `gradient-default` en la configuración de Didor.

## Sombras

### shadow(deep, color, soft, long)

- deep (integer)

La función shadow devuelve una sombra mediante la técnica de capas con un efecto más realista.

La profundidad es un valor numérico, a mayor valor la altura de la sombra será mayor, aunque no recomiendo usar valores mayores de 6 porque el número de capas sería excesivo.

Los parámetros color, soft y long, se definen por defecto en la configuración de Didor Styles y no son necesarios incluirlos al llamar la función.

```scss
// css-variables: true,
.element1 {
  box-shadow: shadow(3);
  // 0 2px 2px rgba(var(--shadow-color), 0.1125),
  // 0 4px 4px rgba(var(--shadow-color), 0.1125),
  // 0 6px 6px rgba(var(--shadow-color), 0.1125);
}

.element2 {
  box-shadow: shadow(3, brand);
}
```
