// Autor: Nombre Apellido

import type { ReviewInterface } from '@/interfaces/ReviewInterface'

export function seedReviews(): ReviewInterface[] {
  return [
    //  Persian (1)
    {
      id: 'r1',
      rating: 5,
      comment: 'Super calm and beautiful cat.',
      postDate: new Date(),
      userId: 'u1',
      domesticAnimalId: '1',
    },
    {
      id: 'r2',
      rating: 4,
      comment: 'Very elegant but needs grooming.',
      postDate: new Date(),
      userId: 'u2',
      domesticAnimalId: '1',
    },

    //  Chihuahua (2)
    {
      id: 'r3',
      rating: 4,
      comment: 'Very energetic and loyal.',
      postDate: new Date(),
      userId: 'u3',
      domesticAnimalId: '2',
    },
    {
      id: 'r4',
      rating: 3,
      comment: 'Cute but barks a lot.',
      postDate: new Date(),
      userId: 'u1',
      domesticAnimalId: '2',
    },

    //  Macaw (3)
    {
      id: 'r5',
      rating: 5,
      comment: 'Amazing colors and very smart.',
      postDate: new Date(),
      userId: 'u2',
      domesticAnimalId: '3',
    },
    {
      id: 'r6',
      rating: 4,
      comment: 'Needs a lot of attention.',
      postDate: new Date(),
      userId: 'u3',
      domesticAnimalId: '3',
    },

    //  Himalayan (4)
    {
      id: 'r7',
      rating: 5,
      comment: 'Very affectionate and calm.',
      postDate: new Date(),
      userId: 'u1',
      domesticAnimalId: '4',
    },
    {
      id: 'r8',
      rating: 4,
      comment: 'Beautiful eyes, very friendly.',
      postDate: new Date(),
      userId: 'u2',
      domesticAnimalId: '4',
    },

    //  Golden Retriever (5)
    {
      id: 'r9',
      rating: 5,
      comment: 'Best family dog ever.',
      postDate: new Date(),
      userId: 'u3',
      domesticAnimalId: '5',
    },
    {
      id: 'r10',
      rating: 5,
      comment: 'Very loyal and intelligent.',
      postDate: new Date(),
      userId: 'u1',
      domesticAnimalId: '5',
    },

    //  Canary (6)
    {
      id: 'r11',
      rating: 4,
      comment: 'Lovely singing bird.',
      postDate: new Date(),
      userId: 'u2',
      domesticAnimalId: '6',
    },
    {
      id: 'r12',
      rating: 3,
      comment: 'Nice but a bit noisy.',
      postDate: new Date(),
      userId: 'u3',
      domesticAnimalId: '6',
    },

    //  Netherland Dwarf (7)
    {
      id: 'r13',
      rating: 4,
      comment: 'Very cute and small.',
      postDate: new Date(),
      userId: 'u1',
      domesticAnimalId: '7',
    },
    {
      id: 'r14',
      rating: 3,
      comment: 'A bit shy but playful.',
      postDate: new Date(),
      userId: 'u2',
      domesticAnimalId: '7',
    },

    //  Syrian Hamster (8)
    {
      id: 'r15',
      rating: 4,
      comment: 'Easy to take care of.',
      postDate: new Date(),
      userId: 'u3',
      domesticAnimalId: '8',
    },
    {
      id: 'r16',
      rating: 3,
      comment: 'Very active at night.',
      postDate: new Date(),
      userId: 'u1',
      domesticAnimalId: '8',
    },
  ]
}
