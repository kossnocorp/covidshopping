import  {  I18nLocale  }  from  '.'

const  pluralizeForms : Record < string ,  string [ ] >  =  {
  serving : [ 'porción' ,  'porciones' ,  'porciones' ] ,
  day : [ 'día' ,  'día' ,  'días' ] ,
  adult : [ 'adulto' ,  'adultos' ,  'adultos' ] ,
  kid : [ 'niño' ,  'niño' ,  'niños' ] ,
  roll : [ 'bolillo' ,  'bolillo' ,  'bolillos' ]
}

const  esLocale : I18nLocale  =  {
  localeName: 'Español' ,

  title: 'Generador de lista de compras de Coronavirus',
  description:
    "¿Qué comprar y cocinar durante el coronavirus? Como sobrevivir la cuarenta? Cuéntanos que tan grande es tu familia, tu dieta, y nosotros generaremos una lista de compras racionalizada.",

  about: {
    collapsed: `<strong>¿Para qué sirve esta App?</strong>`,
    expanded: `
<p>
  <strong>¿Para qué sirve esta App?</strong> Usa el generador
  para planear las compras para la cuarentena del COVID-19. Selecciona la duración de estadía en casa, cantidad de personas, menú, y 
  obtén la lista de productos a comprar.
</p>
<p>
  Usa el "Compartir con familia" para generar una lista de quehaceres y 
  compartirla con tu hogar o enviarla a tu telefono.
</p>
<p>
  <a href="mailto:koss@nocorp.me">Email me</a> Si tienes alguna sugerencia!
</p>
`
  },

  measurement: {
    system: 'Sistema métrico',
    metric: 'Métrico',
    imperial: 'Imperial'
  },

  numberOfDays: 'Cantidad de días',
  numberOfAdults: 'Cantidad de adultos',
  numberOfKids: 'Niños',

  kidsServing: {
    title: 'El tamaño de la porción de niños se calcula como',
    adult: 'adultos'
  },

  sections: {
    essentials: {
      title: 'Esenciales'
    },

    breakfast: {
      title: 'Desayuno'
    },

    meals: {
      title: 'Comidas',
      formula: {
        intro: '2 comidas por día'
      }
    },

    drinks: {
      title: 'Bebidas',
      description:
        'Tres bebidas por día por persona. En desayuno, almuerzo, y cena.'
    },

    preview: {
      title: 'Lista de Compra',
      share: 'Compartir con familia'
    },

    list: {
      title: 'Lista de Compra',
      description:
        'Comparte esta página con tu familia. Cuando marques un producto, la lista se actualiza automáticamente en todos tus dispositivos que tengan abierta esta página.',
      generated: {
        intro: 'La lista de compras se ha generado usando',
        link: 'Generador de lista de compras de Coronavirus'
      },
      addToList: 'Agregar a lista',
      remove: 'Eliminar'
    }
  },

  translate: (str: string) => {
    switch (str) {
      case 'Sauce':
        return 'Salsa'

      case 'Meat':
        return 'Carne'

      case 'Pesto':
        return 'Pesto'

      case 'Arrabiata':
        return 'Arrabiata'

      case 'Tomato sauce':
      case 'Tomato':
        return 'Salsa de tomate'

      case 'Pasta':
        return 'Pasta'

      case 'Rice':
        return 'Arroz'

      case 'Chickpeas':
        return 'Garbanzos'

      case 'Bulgur':
        return 'Bulgur'

      case 'Lentils':
        return 'Lentejas'

      case 'Couscous':
        return 'Cuscús'

      case 'Buckwheat':
        return 'Alforfón'

      case 'Potato':
        return 'Papa'

      case 'Veggie':
        return 'Vegetariana'

      case 'Ravioli':
        return 'Ravioli'

      case 'Fish':
        return 'Pescado'

      case 'Chicken':
        return 'Pollo'

      case 'Ingredients':
        return 'Ingredientes'

      case 'Side':
        return 'Guarnición'

      case 'Eggs':
        return 'Huevos'

      case 'Oatmeal':
        return 'Harina de avena'

      case 'Cereals':
        return 'Cereales'

      case 'Cheese pancakes':
        return 'Tortitas de queso'

      case 'Cottage cheese':
        return 'Queso cottage'

      case 'Toilet paper':
        return 'Papel Higiénico'

      case 'Paper towels':
        return 'Papel toalla'

      case 'Tea':
        return 'Te'

      case 'Coffee':
        return 'Café'

      default:
        return str
    }
  } ,

  pluralize : ( str : string ,  num : number )  =>  {
    const  mod  =  num % 10
    const  form  =  ( num > = 10  &&  num <= 20 )  ||  mod  >  4 ? 2 : mod  ===  1 ? 0 : 1
    return  pluralizeForms [ str ] [ form ]
  }
}
export default esLocale
