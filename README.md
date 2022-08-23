# odin-inventory-application
A simple inventory applicant to practice MVC architecture and Express

Cars might be a bad idea, too many options and differences:
need to have: name, description, category, price, # in-stock, and URL

Easier Ideas: Grocery Store or Gameboy Store

For Gameboy Store:
  - 3 categories: games, consoles, accessories

Consoles {
  name: Gameboy Advance SP
  description: With a backlight and flip up screen you can play your favorite games anywhere
  price: $120
  in-stock: 250
  url: idk
}

Games {
  name: Metroid Zero Mission
  description: platformer/puzzle game
  release-date: 2004
  price: $20
  in-stock: 98
  url: idk
}

Accessories {
  name: charger
  description: Battery charger for gameboy advance SP
  compatible_with: gameboy advance SP
  price: $10
  in-stock: 50
  url: idk
}

want to be able to sort by item or category (view all consoles, and be able to view all Gameboy Advance SPs)



<!-- 
Item for inventory: cars

Schema Prototypes:

a car has attributes like:
  - make (Toyota, Honda, Ford)
  - model (Corolla, CR-V, Escape) and a trim level (LE, SXT, S)
  - year (any number from 1886 to current year + 1 i.e. 2023 cars are made and sold in the year 2022)
  - Options (probably gunna end up being a object, with the field being an option like "heated seats" and the value being true or false)

Make Schema (very similar to genere, only one attribute)
Make {
  name: Toyota 
}

Model {
  name: corolla,
  trim: le,
  type: sedan (maybe)
}

Year {
  name: 2004
}

Options {
  power_windows: true,
  heated_seats: false,
}

CarInstance (Should hold Make, Model, Year, and Options)
VehicleInstance {
  Make,
  Model,
  Year,
  Options,
} -->