// Internal imports
import type { DomesticAnimalInterface } from '@/interfaces/domesticAnimalInterface'
import { seedCategories } from '@/seeders/categorySeeder'

export function seedDomesticAnimals(): DomesticAnimalInterface[] {

  const categories = seedCategories()

  const catCategory = categories.find(category => category.id === 'cat')!
  const dogCategory = categories.find(category => category.id === 'dog')!
  const birdCategory = categories.find(category => category.id === 'bird')!

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
      reviews: []
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
      reviews: []
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
      reviews: []
    }
  ]
}