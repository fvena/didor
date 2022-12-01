# Convenciones de nombres

Como nombrar las clases para escalar, ser coherentes y fáciles de recordar.

## 1. Usar los valores de las propiedades de forma explicita

Si los posibles valores de una propiedad son autoexplicativos y no pueden generar conflictos, los usaremos directamente:

```css
.block {
  display: block;
}
.italic {
  font-style: italic;
}
.underline {
  text-decoration: underline;
}
```

## 2. Acortar los nombres de propiedades muy largos

Si el nombre de la propiedad contiene palabras que pueden ser acortadas sin confusión, las acortamos:

```css
.bg-black: {
  background-color: black;
}
.bg-white: {
  background-color: white;
}
```

## 3. Simplificar los nombres de una propiedad

Simplificaremos los nombres de las propiedades a su denominador común más sencillo, intentando que no cause confusión o conflictos con otras propiedades similares.

```css
.text-left {
  text-align: left;
}
.align-middle {
  vertical-align: middle;
}
.font-h2 {
  font-size: 1.25rem;
}
```

En el caso de la propiedad `line-height` simplificarla a `line` o `height` podría generar confusión, en este caso se ha optado por la convención `leading`.

## 4. Simplificar las unidades como caracteres

Solo en el caso de las unidades de medida, las simplificaremos a caracteres, ya que al ir precedidades de un número son más intuitivas y estamos más acostumbrados

```css
.width-100p {
  width: 100%;
}
.width-100vw {
  width: 100vw;
}
```
