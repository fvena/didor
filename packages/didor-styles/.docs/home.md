# Introducción

Didor Styles es un completo generador "Utility-First" completamente configurable y un framework CSS desarrollado en Sass. Esto significa que tienes todo el poder de un flujo de trabajo "Utility-First" sin perder el potencial de Sass.

## ¿Por qué Didor es diferente?

Si tu objetivo es desarrollar tu propio sistema de diseño o todo el diseño desde cero, estas son algunas de las ventajas de utilizar Didor.

### 1. Escrito íntegramente en Sass

Si estás utilizando Sass para desarrollar tu proyecto, podrás integrarlo con solo una línea de código, y tendrás una gran base para comenzar y varías herramientas que te facilitarán el trabajo.

```scss
// importa didor al inicio de tu archivo principal scss
@use 'didor' as *;
```

### 2. Facil de configurar

Modificar los colores, tipografías, breakpoints, prefijos, usar !important en las clases generadas, ... Didor permite varias opciones de configuración para que puedas iniciar tu proyecto comodamente.

```scss
@use 'didor' as * with
  (
    $config: (
      prefix: 'miProyecto',
      important: true,
      theme: (
        brand: #dd224e,
        warning: #ffbe33,
        success: #77c23d,
        danger: #ff4733,
      ),
      font-families: (
        base: (
          'Source Sans Pro',
          Helvetica Neue,
          Arial,
          sans-serif,
        ),
        header: (
          'Source Sans Pro',
          Helvetica Neue,
          Arial,
          sans-serif,
        ),
        mono: (
          'Fira Code',
          'Courier New',
          Courier,
          monospace,
        ),
      ),
    )
  );
```

### 3. Desarrollado con variables CSS

Didor genera automáticamente un listado de variables CSS. Esto te permitirá más flexibilidad a la hora de personalizar los estilos o su modificación en tiempo de ejecución con javascript. Aunque si lo prefieres puedes modificar la configuración para que no se generen y utilicen.

```scss
:root {
  --font-base: "Source Sans Pro", Helvetica Neue, Arial, sans-serif;
  --font-h1: 2.24rem;
  --font-h2: 1.907rem;
  --brand-dark: 187,22,66;
  --brand: 221,34,78;
  ...
}
```

### 4. Funciones de ayuda Sass y mixins para acceder a los valores de tus variables

El patrón "Utility-First" tiene muchas ventajas en muchos casos, pero en otros será mejor crear tus propias clases. Didor cuenta con varias clases para agilizarte el acceso a tu configuración y que puedas desarrollar más rápido.

```scss
.custom-element {
  background-color: color(brand); // var(--brand)
  box-shadow: shadow(
    2
  ); // 0 2px 2px rgba(var(--shadow-color), 0.1125), 0 4px 4px rgba(var(--shadow-color), 0.1125), ...;
  font-weight: font(bold); // 600
  margin-bottom: double(); // 2.4rem
  padding: simple(); // 1.6rem
}
```

### 5. Excluye o incluye solo los grupos de propiedades que necesites

Seguramente no necesites tener todas "Utility-Class", yo personalmente solo suelo usar las de los colores, textos y espacio. Podrás eliminar o incluir fácilmente solo las que vayas a utilizar.

```scss
@use 'didor' as * with
  (
    $config: (
      include: (
        colors,
        types,
        sizes,
      ),
    )
  );
```

### 6. Diseñado para ser ligero

Con todas las clases y opciones habilitadas, Didor sigue siendo de los frameworks más ligeros, pero gracias a la posibilidad de elegir que queremos generar, podemos reducir drásticamente su tamaño.

## Pros y Contras de Utility-First

Utility-First (Clases Útiles al principio), es un patrón CSS que optimiza el desarrollo de los estilos de un proyecto mediante la generación de clases de bajo nivel, altamente reutilizables, inmutables y con un solo propósito.

Actualmente está de moda gracias a frameworks como Tailwind, aunque no es algo nuevo, todos hemos escrito y utilizado clases de ayuda en nuestros proyectos como `.clearfix` o `.text-right`.

### 1. PRO - Reutilizar

Dado la simplicidad de estas clases, es fácil intercambiar componentes con otros proyectos, ya que estás clases serán y harán exactamente lo mismo.

### 2. PRO - Productividad

Es mucho más rápido aplicar un estilo básico a un elemento añadiéndole un par de clases, que crearle una clase propia, además nos evita tener que estar navegando entre dos archivos para entender la estructura y estilos de un componente.

### 3. PRO - Adaptación

Muchas veces cuando aplicamos un mismo estilo a varios elementos, necesitamos realizar pequeños cambios donde solo necesitamos modificar una o dos propiedades, como la alineación de un texto o su color. Gracias a estas clases, podemos adaptar un diseño rápidamente sin tener que crear otras clases específicas.

### 4. PRO - Prototipado

Es mucho más rápido y sencillo realizar prototipos con diseños sencillos, aplicando unicamente algunas clases predefinidas, que tener que ir creando clases específicas para cada elemento y moviéndote entre archivos.

### 5. CONTRA - Mantenimiento

Muchos elementos básicos que necesitaremos reutilizar en nuestro proyecto, tendrán muchas clases, como un botón. Tener que copiar y pegar un listado con más de 5 clases por todo el proyecto, es mucho más costoso, aparte, si necesitamos realizar un cambio en el diseño, puede resultar imposible.

### 6. CONTRA - Semántica

Al crear clases específicas para cada elemento, podemos asignarle un nombre semántico que nos ayude a saber de que elemento se trata y la estructura de una página o componente. Sin embargo, un diseño donde solo encontramos div con listados de clases puede resultar indescifrable.

### 7. CONTRA - Responsive y Cross Browser

Solucionar problemas relacionados con la visualización en distintos navegadores o realizar diseños responsive puede resultar mucho más complejo y multiplicar el número de clases en cada elemento. Aumentando la complejidad de las vistas y su mantenimiento.

### 8. CONTRA - Curva de aprendizaje

Usar el patrón Utility-First no evita que tengas que saber CSS, ya que simplemente transcribe las propiedades CSS a clases, por lo que sigues necesitando conocer todas las propiedades, que valores tienen, para que sirven y como combinar varias a la misma vez para realizar ciertos diseños. Y además tienes que aprenderte todos los equivalentes en clases de las propiedades CSS.

## Pros y Contras de los frameworks de componentes

Los frameworks de **componentes** tipo Bootstrap, nos ofrecen multitud de componentes prediseñados para utilizar en nuestras aplicaciones así como soluciones de diseño y sistemas de diseño predefinidos.

### 1. PRO - Productividad

Podemos desarrollar interfaces completas rápidamente gracias a todos los componentes y estilos que tienen prediseñados, además podemos adaptarlos fácilmente al estilo de nuestro proyecto modificando algunas variables.

### 2. PRO - Responsive y Cross Browser

Normalmente aplican buenas prácticas y son desarrollados y probados en los principales navegadores y dispositivos.

### 3. CONTRA - Personalización

Modificar el estilo de un componente más haya de la configuración por defecto puede ser bastante complicado, al igual que modificar su arquitectura para añadir o quitar elementos. También puede suponer un problema si queremos modificar su funcionalidad o estados.

### 4. CONTRA - Complejidad

Normalmente suelen intentar ser lo más flexibles posibles, con muchas opciones de configuración y funcionalidad, lo que puede derivar en una sobreingeniería o en un uso más complejo.

## ¿Por qué Didor es diferente?

Por desgracia es imposible juntar en un solo framework todos los pros y eliminar todos los contras de otros frameworks, pero si tu objetivo es desarrollar un "design system" propio o tu propia librería desde cero, si que es posible.
