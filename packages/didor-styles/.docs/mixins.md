# Api Mixins

Si has instalado Didor Styles como módulo sass, tendrás acceso a varios mixins de ayuda añadir bloques de código reutilizables fácilmente:

```scss
.element {
  color: color(brand);

  @include media(lap) {
    color: color(danger);
  }

  @include media(palm) {
    color: color(warning);
  }
}

// Compilación
.element {
  color: rgba(var(--brand), 1);
}
@media screen and (min-width: 37.5em) and (max-width: 56.1875em) {
  .element {
    color: rgba(var(--danger), 1);
  }
}
@media screen and (max-width: 37.4375em) {
  .element {
    color: rgba(var(--warning), 1);
  }
}
```

## Colores

### theme()

Permite definir fácilmente los estilos que se aplicaran a cada tema: light, dark.

```scss
.element {
  color: color(brand);

  @include media(dark) {
    color: color(white);
  }
}
```

## Hover

### hover()

En algunas ocasiones añadir propiedades dentro del pseudo selector `:hover` puede provocar efectos extraños al usar un dispositivo táctil, con este mixin te aseguras que estas propiedades solo se apliquen si el dispositivo no es táctil.

```scss
.link {
  color: color(brand);

  @include hover(dark) {
    text-decoration: underline;
  }
}
```

## Responsive

### media()

Genera un media query con los datos del tamaño de pantalla indicada:

- palm, lap, small, desk, large, portrait, landscape, touch, screen, tablet

```scss
.element {
  color: color(brand);

  @include media(lap) {
    color: color(danger);
  }

  @include media(palm) {
    color: color(warning);
  }
}
```
