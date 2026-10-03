// Meal plan data, from plans/food-plan.md (≈2,000 kcal and 140 g protein a day).
// Two-week rotation: week A is the plan's sample week, week B swaps the dinners around.
// Lunches are mostly the previous dinner's leftovers, so each dinner is cooked for 2 portions.

window.MEALS = (() => {
  // Shopping items. Quantities are per time the meal is made (for one person).
  // cat: protein | dairy | carbs | veg | tins | other
  const I = (name, qty, unit, cat) => ({ name, qty, unit, cat });

  const M = {
    oatsSkyr: {
      name: 'Oats + Skyr + banana', kcal: 480, protein: 35,
      how: '60 g oats with 250 g Skyr (or Magerquark), 1 banana or a handful of frozen berries.',
      buy: [I('Oats (Haferflocken)', 60, 'g', 'carbs'), I('Skyr', 250, 'g', 'dairy'), I('Bananas', 1, 'pcs', 'veg')],
    },
    eggsBread: {
      name: '3 eggs + Vollkornbrot', kcal: 450, protein: 30,
      how: '3 eggs (scrambled or boiled), 2 slices Vollkornbrot, tomato or cucumber on the side.',
      buy: [I('Eggs', 3, 'pcs', 'protein'), I('Vollkornbrot', 2, 'slices', 'carbs'), I('Tomatoes', 1, 'pcs', 'veg')],
    },
    quarkOats: {
      name: 'Magerquark + oats + banana', kcal: 470, protein: 40,
      how: '250 g Magerquark, 40 g oats, 1 banana, cinnamon.',
      buy: [I('Magerquark', 250, 'g', 'dairy'), I('Oats (Haferflocken)', 40, 'g', 'carbs'), I('Bananas', 1, 'pcs', 'veg')],
    },
    weekendBreakfast: {
      name: 'Weekend breakfast (plate rule)', kcal: 500, protein: 30,
      how: 'Sit down for it. Protein first (eggs, Quark, cheese), half the plate fruit/veg, one roll max.',
      buy: [I('Eggs', 2, 'pcs', 'protein')],
    },
    skyrFruit: {
      name: 'Skyr + fruit', kcal: 250, protein: 25,
      how: '200 g Skyr with an apple or berries.',
      buy: [I('Skyr', 200, 'g', 'dairy'), I('Apples', 1, 'pcs', 'veg')],
    },
    eggsApple: {
      name: '2 boiled eggs + apple', kcal: 230, protein: 13,
      how: '2 eggs from the batch-cooked boiled eggs, 1 apple.',
      buy: [I('Eggs', 2, 'pcs', 'protein'), I('Apples', 1, 'pcs', 'veg')],
    },
    proteinYog: {
      name: 'Protein yoghurt / pudding', kcal: 200, protein: 20,
      how: 'One cup of high-protein yoghurt or pudding (e.g. 200 g).',
      buy: [I('Protein yoghurt', 1, 'cup', 'dairy')],
    },
    huttenVeg: {
      name: 'Hüttenkäse + veg sticks', kcal: 220, protein: 24,
      how: '200 g Hüttenkäse with cucumber and carrot sticks.',
      buy: [I('Hüttenkäse', 200, 'g', 'dairy'), I('Cucumber', 0.5, 'pcs', 'veg'), I('Carrots', 2, 'pcs', 'veg')],
    },
    saladTuna: {
      name: 'Big salad + tuna + chickpeas', kcal: 550, protein: 45,
      how: 'Salad bag, 1 can tuna, ½ can chickpeas, tomatoes, cucumber, 1 tsp olive oil, lemon.',
      buy: [I('Canned tuna', 1, 'can', 'tins'), I('Chickpeas', 0.5, 'can', 'tins'), I('Salad bag', 0.5, 'bag', 'veg'),
            I('Tomatoes', 2, 'pcs', 'veg'), I('Cucumber', 0.5, 'pcs', 'veg')],
    },
    wraps: {
      name: 'Turkey wraps + yoghurt sauce', kcal: 600, protein: 45,
      how: '2 wholegrain wraps, 150 g turkey strips (pan), salad, 50 g Skyr with garlic and herbs.',
      buy: [I('Wholegrain wraps', 2, 'pcs', 'carbs'), I('Turkey breast', 150, 'g', 'protein'),
            I('Salad bag', 0.5, 'bag', 'veg'), I('Skyr', 50, 'g', 'dairy')],
    },
    // Dinners: made for 2 portions (dinner + next day's lunch) unless noted.
    curry: {
      name: 'Chicken & vegetable curry + basmati', kcal: 600, protein: 45, portions: 2, freezes: true,
      how: 'Fry onion + curry paste, add 360 g diced chicken, peppers/frozen veg, 200 ml light coconut milk, simmer 15 min. 1 cupped hand rice per plate.',
      buy: [I('Chicken breast', 360, 'g', 'protein'), I('Basmati rice', 150, 'g', 'carbs'), I('Light coconut milk', 200, 'ml', 'tins'),
            I('Peppers', 2, 'pcs', 'veg'), I('Frozen vegetable mix', 300, 'g', 'veg'), I('Onions', 1, 'pcs', 'veg')],
    },
    chili: {
      name: 'Chili con carne + rice', kcal: 600, protein: 42, portions: 2, freezes: true,
      how: 'Brown 300 g Rinderhack 5% with onion, add kidney beans, canned tomatoes, pepper, chili/cumin, simmer 20 min. Serve with rice.',
      buy: [I('Rinderhack 5%', 300, 'g', 'protein'), I('Kidney beans', 1, 'can', 'tins'), I('Canned tomatoes', 1, 'can', 'tins'),
            I('Peppers', 1, 'pcs', 'veg'), I('Onions', 1, 'pcs', 'veg'), I('Basmati rice', 150, 'g', 'carbs')],
    },
    salmonTray: {
      name: 'Oven tray: salmon + potatoes + broccoli', kcal: 620, protein: 38, portions: 2,
      how: '200 °C: potatoes 15 min first, then add 2 × 150 g salmon and broccoli for 15 min. Lemon, salt, pepper.',
      buy: [I('Salmon (frozen)', 300, 'g', 'protein'), I('Potatoes', 500, 'g', 'carbs'), I('Broccoli', 400, 'g', 'veg')],
    },
    chickenTray: {
      name: 'Oven tray: chicken + potatoes + veg', kcal: 600, protein: 45, portions: 2,
      how: '200 °C, 30 min: 360 g chicken, potatoes, peppers/broccoli, 1 tbsp oil, paprika.',
      buy: [I('Chicken breast', 360, 'g', 'protein'), I('Potatoes', 500, 'g', 'carbs'), I('Broccoli', 300, 'g', 'veg'), I('Peppers', 1, 'pcs', 'veg')],
    },
    bolognese: {
      name: 'Bolognese + wholegrain pasta', kcal: 620, protein: 42, portions: 2, freezes: true,
      how: 'Brown 300 g lean mince with onion + grated carrot, add 500 g passata, simmer 20 min. 80 g dry pasta per plate.',
      buy: [I('Rinderhack 5%', 300, 'g', 'protein'), I('Wholegrain pasta', 160, 'g', 'carbs'), I('Passata', 500, 'g', 'tins'),
            I('Onions', 1, 'pcs', 'veg'), I('Carrots', 1, 'pcs', 'veg')],
    },
    dal: {
      name: 'Dal + rice + Skyr raita', kcal: 600, protein: 40, portions: 2, freezes: true,
      how: '200 g red lentils, onion, garlic, canned tomatoes, spinach, cumin/turmeric, 20 min. Raita: 200 g Skyr + grated cucumber.',
      buy: [I('Red lentils', 200, 'g', 'tins'), I('Canned tomatoes', 1, 'can', 'tins'), I('Spinach (frozen)', 200, 'g', 'veg'),
            I('Onions', 1, 'pcs', 'veg'), I('Basmati rice', 150, 'g', 'carbs'), I('Skyr', 200, 'g', 'dairy'), I('Cucumber', 0.5, 'pcs', 'veg')],
    },
    stirfry: {
      name: 'Egg fried rice / stir fry', kcal: 580, protein: 40, portions: 1,
      how: 'Leftover or fresh rice, 3 eggs, 100 g chicken, 400 g frozen stir-fry veg, soy sauce. One pan, 10 min.',
      buy: [I('Eggs', 3, 'pcs', 'protein'), I('Chicken breast', 100, 'g', 'protein'), I('Frozen stir-fry veg', 400, 'g', 'veg'), I('Basmati rice', 75, 'g', 'carbs')],
    },
    flexible: {
      name: 'Flexible meal (80/20)', kcal: 800, protein: 35,
      how: 'Pizza night or eating out. Enjoy it, one plate, no "cheat day".',
      buy: [],
    },
  };

  const leftover = key => ({ ...M[key], name: M[key].name + ' (leftovers)', leftover: true, buy: [] });

  // Day templates, Monday = index 0.
  const WEEK_A = [
    { training: 'A', b: 'oatsSkyr', l: leftover('curry'), s: 'skyrFruit', d: 'chili' },
    { b: 'eggsBread', l: leftover('chili'), s: 'eggsApple', d: 'curry' },
    { training: 'B', b: 'oatsSkyr', l: 'saladTuna', s: 'proteinYog', d: 'salmonTray',
      prep: 'Wednesday top-up (30 min): oven tray dinner tonight, or defrost a frozen portion.' },
    { b: 'quarkOats', l: leftover('salmonTray'), s: 'huttenVeg', d: 'bolognese' },
    { b: 'eggsBread', l: leftover('bolognese'), s: 'skyrFruit', d: 'flexible' },
    { training: 'C', b: 'oatsSkyr', l: 'wraps', s: 'eggsApple', d: 'dal' },
    { b: 'weekendBreakfast', l: leftover('dal'), s: 'proteinYog', d: 'stirfry', batch: 'chili',
      prep: 'Sunday batch cook (~90 min): a pot of chili (for Monday lunch + 2 freezer boxes), a pot of rice, a tray of roasted veg, 10 boiled eggs.' },
  ];
  const WEEK_B = [
    { training: 'A', b: 'oatsSkyr', l: leftover('chili'), s: 'skyrFruit', d: 'curry' },
    { b: 'eggsBread', l: leftover('curry'), s: 'huttenVeg', d: 'bolognese' },
    { training: 'B', b: 'oatsSkyr', l: leftover('bolognese'), s: 'proteinYog', d: 'chickenTray',
      prep: 'Wednesday top-up (30 min): oven tray dinner tonight, or defrost a frozen portion.' },
    { b: 'quarkOats', l: leftover('chickenTray'), s: 'eggsApple', d: 'dal' },
    { b: 'eggsBread', l: leftover('dal'), s: 'skyrFruit', d: 'flexible' },
    { training: 'C', b: 'oatsSkyr', l: 'wraps', s: 'proteinYog', d: 'stirfry' },
    { b: 'weekendBreakfast', l: 'saladTuna', s: 'eggsApple', d: 'salmonTray', batch: 'curry',
      prep: 'Sunday batch cook (~90 min): a pot of chicken curry (for Monday lunch + freezer), a pot of rice, a tray of roasted veg, 10 boiled eggs.' },
  ];

  // Always worth having at home. "Running low" items get added to the shopping list.
  const PANTRY = [
    ['Oats (Haferflocken)', 'carbs'], ['Basmati rice', 'carbs'], ['Wholegrain pasta', 'carbs'], ['Vollkornbrot (freezer)', 'carbs'],
    ['Red lentils', 'tins'], ['Canned tuna', 'tins'], ['Kidney beans', 'tins'], ['Chickpeas', 'tins'], ['Canned tomatoes', 'tins'],
    ['Passata', 'tins'], ['Light coconut milk', 'tins'],
    ['Frozen vegetable mix', 'veg'], ['Frozen stir-fry veg', 'veg'], ['Frozen berries', 'veg'], ['Spinach (frozen)', 'veg'],
    ['Salmon (frozen)', 'protein'], ['Eggs', 'protein'],
    ['Olive oil', 'other'], ['Spices: curry, chili, cumin, paprika, turmeric', 'other'], ['Soy sauce', 'other'], ['Mustard / salsa / hot sauce', 'other'],
    ['Nuts (portion bags)', 'other'], ['Sugar-free gum (cravings)', 'other'], ['Sparkling water', 'other'], ['Tea', 'other'],
  ];

  const RULES = [
    'Protein at every meal',
    'No liquid calories (water, sparkling water, black coffee, tea)',
    'Coffee before 14:00',
    'Kitchen closes 2–3 h before bed',
    'Evening cravings: tea, sparkling water or protein yoghurt ready',
  ];

  const CATS = { protein: 'Meat, fish & eggs', dairy: 'Dairy', carbs: 'Bread, grains & potatoes', veg: 'Fruit & veg', tins: 'Tins & dry goods', other: 'Other' };

  return { M, WEEK_A, WEEK_B, PANTRY, RULES, CATS, TARGET: { kcal: 2000, protein: 140 } };
})();
