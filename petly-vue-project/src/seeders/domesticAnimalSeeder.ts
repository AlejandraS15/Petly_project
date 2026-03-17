// Autor: Nombre Apellido

// Internal imports
import type { DomesticAnimalInterface } from '@/interfaces/DomesticAnimalInterface'
import { seedCategories } from '@/seeders/categorySeeder'
import { seedReviews } from '@/seeders/reviewSeeder'

export function seedDomesticAnimals(): DomesticAnimalInterface[] {
  const categories = seedCategories()
  const reviews = seedReviews()

  const catCategory = categories.find((category) => category.id === 'cat')!
  const dogCategory = categories.find((category) => category.id === 'dog')!
  const birdCategory = categories.find((category) => category.id === 'bird')!
  const rabbitCategory = categories.find((category) => category.id === 'rabbit')!
  const hamsterCategory = categories.find((category) => category.id === 'hamster')!

  return [
    {
      id: '1',
      breed: 'Persian',
      description: 'Elegant long-haired cat.',
      lifeExpectancy: '12-17 years',
      weight: '3-5 kg',
      height: '23-25 cm',
      behaviours: 'Calm and affectionate',
      commonDisease: 'Polycystic kidney disease',
      countryOrigin: 'Iran',
      history: 'One of the oldest cat breeds.',
      image: '/images/animals/persa.png',
      category: catCategory,
      reviews: reviews.filter((r) => r.domesticAnimalId === '1'),
    },
    {
      id: '2',
      breed: 'Chihuahua',
      description: 'Small and energetic dog.',
      lifeExpectancy: '14-16 years',
      weight: '1.5-3 kg',
      height: '15-23 cm',
      behaviours: 'Alert and loyal',
      commonDisease: 'Patellar luxation',
      countryOrigin: 'Mexico',
      history: 'Descendant of the Techichi dog.',
      image: '/images/animals/chihuahua.png',
      category: dogCategory,
      reviews: reviews.filter((r) => r.domesticAnimalId === '2'),
    },
    {
      id: '3',
      breed: 'Macaw',
      description: 'Colorful tropical bird.',
      lifeExpectancy: '30-50 years',
      weight: '1-1.5 kg',
      height: '80-90 cm',
      behaviours: 'Social and intelligent',
      commonDisease: 'Psittacosis',
      countryOrigin: 'South America',
      history: 'Native to rainforest regions.',
      image: '/images/animals/macaw.png',
      category: birdCategory,
      reviews: reviews.filter((r) => r.domesticAnimalId === '3'),
    },
    {
      id: '4',
      breed: 'Himalayan',
      description: 'Long-haired cat with blue eyes.',
      lifeExpectancy: '12-15 years',
      weight: '3-5 kg',
      height: '23-25 cm',
      behaviours: 'Calm and affectionate',
      commonDisease: 'Polycystic kidney disease',
      countryOrigin: 'Iran',
      history: 'A cross between the Persian and Siamese breeds.',
      image: '/images/animals/himalayan.png',
      category: catCategory,
      reviews: reviews.filter((r) => r.domesticAnimalId === '4'),
    },
    {
      id: '5',
      breed: 'Golden Retriever',
      description: 'Friendly and intelligent dog.',
      lifeExpectancy: '10-12 years',
      weight: '25-34 kg',
      height: '58-61 cm',
      behaviours: 'Loyal and gentle',
      commonDisease: 'Hip dysplasia',
      countryOrigin: 'Scotland',
      history: 'Originally bred for hunting and retrieving.',
      image: '/images/animals/golden-retriever.png',
      category: dogCategory,
      reviews: reviews.filter((r) => r.domesticAnimalId === '5'),
    },
    {
      id: '6',
      breed: 'Canary',
      description: 'Small and colorful songbird.',
      lifeExpectancy: '10-15 years',
      weight: '10-15 g',
      height: '10-12 cm',
      behaviours: 'Sociable and vocal',
      commonDisease: 'Respiratory infections',
      countryOrigin: 'Canary Islands',
      history: 'Native to the Atlantic islands.',
      image: '/images/animals/canary.png',
      category: birdCategory,
      reviews: reviews.filter((r) => r.domesticAnimalId === '6'),
    },
    {
      id: '7',
      breed: 'Netherland Dwarf',
      description: 'Small and compact rabbit.',
      lifeExpectancy: '7-10 years',
      weight: '0.5-1.5 kg',
      height: '20-25 cm',
      behaviours: 'Shy but playful',
      commonDisease: 'Dental issues',
      countryOrigin: 'Netherlands',
      history: 'Bred for its small size and cute appearance.',
      image: '/images/animals/netherland-dwarf.png',
      category: rabbitCategory,
      reviews: reviews.filter((r) => r.domesticAnimalId === '7'),
    },
    {
      id: '8',
      breed: 'Syrian Hamster',
      description: 'Popular small pet hamster.',
      lifeExpectancy: '2-3 years',
      weight: '120-150 g',
      height: '15-20 cm',
      behaviours: 'Nocturnal and solitary',
      commonDisease: 'Wet tail disease',
      countryOrigin: 'Syria',
      history: 'Discovered in the 1930s and quickly became a popular pet.',
      image: '/images/animals/syrian-hamster.png',
      category: hamsterCategory,
      reviews: reviews.filter((r) => r.domesticAnimalId === '8'),
    },
  ]
}
