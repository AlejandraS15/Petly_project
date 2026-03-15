import type { ReviewInterface } from "@/interfaces/reviewInterface"

export function seedReviews(): ReviewInterface[] {

  return [

    // Persian (animal id = 1)
    {
      id: "r1",
      rating: 5,
      comment: "Beautiful and calm cat",
      postDate: new Date(),
      userId: "u1",
      domesticAnimalId: "1"
    },
    {
      id: "r2",
      rating: 4,
      comment: "Very affectionate",
      postDate: new Date(),
      userId: "u2",
      domesticAnimalId: "1"
    },
    {
      id: "r3",
      rating: 3,
      comment: "Needs grooming",
      postDate: new Date(),
      userId: "u3",
      domesticAnimalId: "1"
    },

    // Chihuahua (animal id = 2)
    {
      id: "r4",
      rating: 5,
      comment: "Very loyal dog",
      postDate: new Date(),
      userId: "u1",
      domesticAnimalId: "2"
    },
    {
      id: "r5",
      rating: 4,
      comment: "Small but brave",
      postDate: new Date(),
      userId: "u2",
      domesticAnimalId: "2"
    },

    // Macaw (animal id = 3)
    {
      id: "r6",
      rating: 5,
      comment: "Amazing bird",
      postDate: new Date(),
      userId: "u3",
      domesticAnimalId: "3"
    },
    {
      id: "r7",
      rating: 3,
      comment: "Very noisy",
      postDate: new Date(),
      userId: "u4",
      domesticAnimalId: "3"
    }

  ]

}
