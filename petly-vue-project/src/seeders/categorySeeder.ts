// Autor: Nombre Apellido

import type { CategoryInterface } from '@/interfaces/CategoryInterface'

export function seedCategories(): CategoryInterface[] {
  return [
    {
      id: 'cat',
      species: 'Cats',
      urlImage: '/images/categories/cat.png',
    },
    {
      id: 'dog',
      species: 'Dogs',
      urlImage: '/images/categories/dog.png',
    },
    {
      id: 'bird',
      species: 'Birds',
      urlImage: '/images/categories/bird.png',
    },
    {
      id: 'fish',
      species: 'Fish',
      urlImage: '/images/categories/fish.png',
    },
    {
      id: 'rabbit',
      species: 'Rabbits',
      urlImage: '/images/categories/rabbit.png',
    },
    {
      id: 'hamster',
      species: 'Hamsters',
      urlImage: '/images/categories/hamster.png',
    },
  ]
}
