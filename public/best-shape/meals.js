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
    // Option 2: Indian home-style (same targets, pork-free).
    masalaOats: {
      name: 'Masala oats + Skyr', kcal: 440, protein: 35,
      how: '60 g oats cooked savoury with onion, tomato, peas, mustard seeds and a pinch of turmeric. 250 g Skyr on the side (or as raita).',
      buy: [I('Oats (Haferflocken)', 60, 'g', 'carbs'), I('Skyr', 250, 'g', 'dairy'), I('Tomatoes', 1, 'pcs', 'veg'), I('Frozen peas', 50, 'g', 'veg')],
    },
    eggBhurji: {
      name: 'Egg bhurji + chapati', kcal: 460, protein: 35,
      how: 'Scramble 3 eggs with onion, tomato, green chili and 100 g Hüttenkäse, 1 tsp oil. 1 wholewheat chapati (30 g atta) or 1 slice Vollkornbrot.',
      buy: [I('Eggs', 3, 'pcs', 'protein'), I('Hüttenkäse', 100, 'g', 'dairy'), I('Atta (wholewheat flour)', 30, 'g', 'carbs'), I('Tomatoes', 1, 'pcs', 'veg')],
    },
    besanChilla: {
      name: 'Besan chilla + Skyr', kcal: 450, protein: 37,
      how: '70 g besan whisked with water, onion, tomato, coriander, salt. Cook 2 thin pancakes with 1 tsp oil. 200 g Skyr with mint on the side.',
      buy: [I('Besan (gram flour)', 70, 'g', 'tins'), I('Skyr', 200, 'g', 'dairy'), I('Tomatoes', 1, 'pcs', 'veg'), I('Onions', 0.5, 'pcs', 'veg')],
    },
    paratha: {
      name: 'Weekend paneer paratha + raita', kcal: 580, protein: 37,
      how: '1 paratha: 60 g atta dough filled with 80 g grated paneer, onion, chili; dry-roast, 1 tsp butter. Raita: 150 g Skyr + cucumber.',
      buy: [I('Atta (wholewheat flour)', 60, 'g', 'carbs'), I('Paneer', 80, 'g', 'dairy'), I('Skyr', 150, 'g', 'dairy'), I('Cucumber', 0.5, 'pcs', 'veg')],
    },
    chanaButtermilk: {
      name: 'Roasted chana + Buttermilch', kcal: 250, protein: 18,
      how: '40 g roasted chickpeas (Asia shop) and 300 ml Buttermilch with a pinch of roasted cumin and salt.',
      buy: [I('Roasted chana', 40, 'g', 'tins'), I('Buttermilch', 300, 'ml', 'dairy')],
    },
    tikkaWrap: {
      name: 'Chicken tikka wrap + mint raita', kcal: 600, protein: 46,
      how: '150 g chicken strips with tikka spice + 1 tbsp Skyr, pan-fried. 2 wholegrain wraps, onion, salad, 50 g Skyr with mint.',
      buy: [I('Chicken breast', 150, 'g', 'protein'), I('Wholegrain wraps', 2, 'pcs', 'carbs'), I('Salad bag', 0.5, 'bag', 'veg'), I('Skyr', 70, 'g', 'dairy')],
    },
    keema: {
      name: 'Chicken keema matar + chapati', kcal: 560, protein: 50, portions: 2, freezes: true,
      how: 'Fry onion, garlic, ginger, 1 tsp oil; brown 400 g Hähnchen- or Putenhack, add canned tomatoes, 200 g peas, garam masala, 15 min. 2 chapati (60 g atta) per plate.',
      buy: [I('Hähnchen- or Putenhack', 400, 'g', 'protein'), I('Frozen peas', 200, 'g', 'veg'), I('Canned tomatoes', 1, 'can', 'tins'),
            I('Onions', 1, 'pcs', 'veg'), I('Atta (wholewheat flour)', 120, 'g', 'carbs')],
    },
    palakChicken: {
      name: 'Palak chicken + rice', kcal: 600, protein: 52, portions: 2, freezes: true,
      how: 'Fry onion, garlic, ginger, 1 tsp oil; add 360 g diced chicken, 450 g frozen spinach, spices, 10 min; stir in 100 g Skyr off the heat. 1 cupped hand rice per plate.',
      buy: [I('Chicken breast', 360, 'g', 'protein'), I('Spinach (frozen)', 450, 'g', 'veg'), I('Skyr', 100, 'g', 'dairy'),
            I('Onions', 1, 'pcs', 'veg'), I('Basmati rice', 150, 'g', 'carbs')],
    },
    biryani: {
      name: 'One-pot chicken biryani + raita', kcal: 600, protein: 50, portions: 2,
      how: 'Marinate 360 g chicken in 150 g Skyr + biryani masala. Fry onion with 2 tsp oil, add chicken, 150 g rinsed basmati and 300 ml water, cover, low heat 20 min. Cucumber on the side.',
      buy: [I('Chicken breast', 360, 'g', 'protein'), I('Skyr', 150, 'g', 'dairy'), I('Basmati rice', 150, 'g', 'carbs'),
            I('Onions', 2, 'pcs', 'veg'), I('Cucumber', 0.5, 'pcs', 'veg')],
    },
    tandooriTray: {
      name: 'Oven tray: tandoori chicken + potatoes + veg', kcal: 600, protein: 48, portions: 2,
      how: '200 °C, 30 min: 360 g chicken marinated in 100 g Skyr + tandoori masala, potatoes, peppers, cauliflower, 1 tbsp oil.',
      buy: [I('Chicken breast', 360, 'g', 'protein'), I('Skyr', 100, 'g', 'dairy'), I('Potatoes', 500, 'g', 'carbs'),
            I('Cauliflower', 0.5, 'pcs', 'veg'), I('Peppers', 1, 'pcs', 'veg')],
    },
    fishCurry: {
      name: 'Fish curry + rice', kcal: 540, protein: 43, portions: 2, freezes: true,
      how: 'Onion-tomato gravy with garlic, ginger, curry powder and 100 ml light coconut milk; add 400 g Alaska-Seelachs (frozen) for the last 8 min. 1 cupped hand rice per plate.',
      buy: [I('Alaska-Seelachs (frozen)', 400, 'g', 'protein'), I('Light coconut milk', 100, 'ml', 'tins'), I('Canned tomatoes', 1, 'can', 'tins'),
            I('Onions', 1, 'pcs', 'veg'), I('Basmati rice', 150, 'g', 'carbs')],
    },
    eggCurry: {
      name: 'Egg curry + rice + raita', kcal: 620, protein: 41, portions: 1,
      how: '3 boiled eggs in an onion-tomato masala (1 tsp oil), 10 min. 1 cupped hand rice, 150 g Skyr with cucumber.',
      buy: [I('Eggs', 3, 'pcs', 'protein'), I('Canned tomatoes', 0.5, 'can', 'tins'), I('Onions', 1, 'pcs', 'veg'),
            I('Basmati rice', 75, 'g', 'carbs'), I('Skyr', 150, 'g', 'dairy'), I('Cucumber', 0.5, 'pcs', 'veg')],
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

  // Option 2: Indian home-style rotation (same rhythm: Sunday batch feeds Monday lunch).
  const WEEK_A_IN = [
    { training: 'A', b: 'masalaOats', l: leftover('curry'), s: 'skyrFruit', d: 'palakChicken' },
    { b: 'eggBhurji', l: leftover('palakChicken'), s: 'chanaButtermilk', d: 'biryani' },
    { training: 'B', b: 'masalaOats', l: leftover('biryani'), s: 'proteinYog', d: 'tandooriTray',
      prep: 'Wednesday top-up (30 min): tandoori tray in the oven tonight, or defrost a frozen portion.' },
    { b: 'besanChilla', l: leftover('tandooriTray'), s: 'huttenVeg', d: 'fishCurry' },
    { b: 'eggBhurji', l: leftover('fishCurry'), s: 'skyrFruit', d: 'flexible' },
    { training: 'C', b: 'masalaOats', l: 'tikkaWrap', s: 'eggsApple', d: 'dal' },
    { b: 'paratha', l: leftover('dal'), s: 'proteinYog', d: 'eggCurry', batch: 'keema',
      prep: 'Sunday batch cook (~90 min): a pot of keema matar (Monday lunch + 2 freezer boxes), a pot of rice, chapati dough for 2 days, 10 boiled eggs.' },
  ];
  const WEEK_B_IN = [
    { training: 'A', b: 'masalaOats', l: leftover('keema'), s: 'skyrFruit', d: 'biryani' },
    { b: 'eggBhurji', l: leftover('biryani'), s: 'huttenVeg', d: 'palakChicken' },
    { training: 'B', b: 'masalaOats', l: leftover('palakChicken'), s: 'proteinYog', d: 'tandooriTray',
      prep: 'Wednesday top-up (30 min): tandoori tray in the oven tonight, or defrost a frozen portion.' },
    { b: 'besanChilla', l: leftover('tandooriTray'), s: 'chanaButtermilk', d: 'dal' },
    { b: 'eggBhurji', l: leftover('dal'), s: 'skyrFruit', d: 'flexible' },
    { training: 'C', b: 'masalaOats', l: 'tikkaWrap', s: 'chanaButtermilk', d: 'fishCurry' },
    { b: 'paratha', l: leftover('fishCurry'), s: 'eggsApple', d: 'eggCurry', batch: 'curry',
      prep: 'Sunday batch cook (~90 min): a pot of chicken curry (Monday lunch + freezer), a pot of rice, chapati dough for 2 days, 10 boiled eggs.' },
  ];

  const STYLES = {
    mix: { label: 'Everyday mix', weeks: [WEEK_A, WEEK_B] },
    indian: { label: 'Indian home-style', weeks: [WEEK_A_IN, WEEK_B_IN] },
  };

  // Always worth having at home. "Running low" items get added to the shopping list.
  const PANTRY = [
    ['Oats (Haferflocken)', 'carbs'], ['Basmati rice', 'carbs'], ['Wholegrain pasta', 'carbs'], ['Vollkornbrot (freezer)', 'carbs'],
    ['Red lentils', 'tins'], ['Canned tuna', 'tins'], ['Kidney beans', 'tins'], ['Chickpeas', 'tins'], ['Canned tomatoes', 'tins'],
    ['Passata', 'tins'], ['Light coconut milk', 'tins'],
    ['Frozen vegetable mix', 'veg'], ['Frozen stir-fry veg', 'veg'], ['Frozen berries', 'veg'], ['Spinach (frozen)', 'veg'],
    ['Salmon (frozen)', 'protein'], ['Eggs', 'protein'],
    ['Olive oil', 'other'], ['Spices: curry, chili, cumin, paprika, turmeric', 'other'], ['Soy sauce', 'other'], ['Mustard / salsa / hot sauce', 'other'],
    ['Atta (wholewheat flour)', 'carbs'], ['Besan (gram flour)', 'tins'], ['Frozen peas', 'veg'],
    ['Spices: garam masala, tandoori, chaat masala, mustard seeds', 'other'],
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

  return { M, WEEK_A, WEEK_B, STYLES, PANTRY, RULES, CATS, TARGET: { kcal: 2000, protein: 140 } };
})();
