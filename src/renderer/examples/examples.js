export default {
  BUDGET: {
    description: 'Simple budget calculator',
    key: 'budget',
    data: `
// credits
monthly_salary = 4000

// debits
housing = 1200
food = 800
car = 320
dog = 100
expenses = housing + food + car + dog

// target
savings_target = 10000

// calculations
monthly_save = monthly_salary - expenses

// result
months_to_target = savings_target / monthly_save
`
  },
  COMBINATIONS: {
    description: 'Basketball Team (Combinations)',
    key: 'combinations',
    data: `
players = 25
team_size = 5

possible_teams = players C team_size
`
  },
  PERMUTATIONS: {
    description: 'Flower Bouquet (Permutations)',
    key: 'permutations',
    data: `
flowers = 20
bouquet_size = 12

possible_teams = flowers P bouquet_size
`
  }
};