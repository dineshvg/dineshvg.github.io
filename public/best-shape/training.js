// Training guide: the 12-week home plan with step-by-step instructions for every exercise.
// Equipment: floor, a sturdy chair, a table, a backpack (books or water bottles) and a towel.
// A resistance band and dumbbells are optional from week 5.

window.TRAINING = (() => {
  const yt = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);

  // Exercise library. steps = how to do one rep; tips = what to watch; easier/harder = how to adjust.
  const EX = {
    chairSquat: {
      name: 'Squat to a chair (backpack goblet squat)',
      steps: ['Stand in front of a chair, feet shoulder-width, toes slightly out.',
        'Hold the backpack against your chest with both arms (skip it in week 1).',
        'Push your hips back and bend your knees until you lightly touch the chair.',
        'Push the floor away and stand up tall. Breathe out on the way up.'],
      tips: ['Knees follow your toes, they do not cave in.', 'Chest up, whole foot on the floor.'],
      easier: 'Use a higher seat, or sit down fully before standing.', harder: 'Heavier backpack, or lower slowly for 3 seconds.',
      video: 'goblet squat to box beginner',
    },
    rdl: {
      name: 'Romanian deadlift (backpack RDL)',
      steps: ['Stand tall holding the backpack in front of your thighs, knees soft.',
        'Push your hips back as if closing a car door with your bum; the backpack slides down your thighs.',
        'Stop when you feel a stretch in the back of your legs (around knee height), back flat.',
        'Squeeze your bum and push your hips forward to stand up.'],
      tips: ['This is a hip hinge, not a squat: knees stay almost still.', 'Keep the weight close to your legs and your back flat.'],
      easier: 'Hands on thighs, no weight.', harder: 'Single-leg version holding a wall, or a heavier bag.',
      video: 'romanian deadlift beginner form',
    },
    reverseLunge: {
      name: 'Reverse lunge',
      steps: ['Stand tall, hold a wall or chair if you need balance.',
        'Step one foot back and lower the back knee towards the floor.',
        'Both knees bend to about 90°; front knee stays over the front foot.',
        'Push through the front heel to step back up. Do all reps on one leg, then switch.'],
      tips: ['Upper body stays upright.', 'Control the way down, don\'t drop onto the knee.'],
      easier: 'Shorter step and smaller range, hold support.', harder: 'Hold the backpack.',
      video: 'reverse lunge beginner',
    },
    splitSquat: {
      name: 'Split squat',
      steps: ['Take a long step: one foot forward, the other back on its toes. Stay in this position.',
        'Lower straight down until the back knee is just above the floor.',
        'Push through the front foot to come back up. All reps on one side, then switch.'],
      tips: ['Weight mostly on the front foot.', 'Hold a chair for balance at first.'],
      easier: 'Smaller range of motion.', harder: 'Hold the backpack or dumbbells.',
      video: 'split squat beginner',
    },
    walkingLunge: {
      name: 'Walking lunge',
      steps: ['Step forward into a lunge, back knee towards the floor.',
        'Push off and bring the back foot forward into the next lunge.', 'Keep walking; count each leg.'],
      tips: ['Upright chest, controlled steps.'], easier: 'Reverse lunge instead.', harder: 'Hold weight.',
      video: 'walking lunge form',
    },
    stepUp: {
      name: 'Step-up',
      steps: ['Stand in front of a sturdy step or the bottom stair (knee height at most).',
        'Put your whole foot on it and push through that heel to stand up on it.',
        'Step down slowly with the other foot. All reps on one leg, then switch.'],
      tips: ['Let the top leg do the work, don\'t push off the floor foot.'], easier: 'Lower step.', harder: 'Higher step or hold weight.',
      video: 'step up exercise form',
    },
    gluteBridge: {
      name: 'Glute bridge',
      steps: ['Lie on your back, knees bent, feet flat and hip-width apart.',
        'Press through your heels and lift your hips until knees, hips and shoulders are in a line.',
        'Squeeze your bum for 1 second at the top, then lower slowly.'],
      tips: ['Don\'t arch your lower back; ribs stay down.'], easier: 'Smaller lift.', harder: 'Backpack on hips, or one leg.',
      video: 'glute bridge beginner',
    },
    hipThrust: {
      name: 'Hip thrust',
      steps: ['Sit on the floor with your upper back against the sofa or a bench, feet flat.',
        'Put the backpack on your hips and hold it.',
        'Drive through your heels and lift your hips until your body is flat like a table.', 'Pause, lower slowly.'],
      tips: ['Chin tucked, look forward not up.'], easier: 'Glute bridge.', harder: 'Heavier bag, pause 2 s at the top.',
      video: 'hip thrust at home couch',
    },
    deadBug: {
      name: 'Dead bug',
      steps: ['Lie on your back, arms straight up, knees bent at 90° above your hips.',
        'Press your lower back into the floor.',
        'Slowly stretch one arm back and the opposite leg out, just above the floor.',
        'Return and switch sides. That is 1 rep per side.'],
      tips: ['Lower back stays glued to the floor: if it lifts, make the movement smaller.', 'Breathe out as you stretch.'],
      easier: 'Move only the legs.', harder: 'Slower, 3 s out and 3 s back.',
      video: 'dead bug exercise beginner',
    },
    plank: {
      name: 'Plank',
      steps: ['Forearms on the floor, elbows under shoulders.',
        'Step your feet back so your body is a straight line from head to heels.',
        'Squeeze your bum and tighten your belly as if bracing for a poke. Hold, breathing normally.'],
      tips: ['No sagging hips and no bum in the air.'], easier: 'On your knees.', harder: 'Longer hold, or lift one foot.',
      video: 'plank proper form beginner',
    },
    sidePlank: {
      name: 'Side plank',
      steps: ['Lie on your side, elbow under the shoulder, legs stacked.',
        'Lift your hips so your body forms a straight line.', 'Hold, then switch sides.'],
      tips: ['Push the floor away with your forearm.'], easier: 'Bottom knee on the floor.', harder: 'Top leg lifted.',
      video: 'side plank beginner',
    },
    hollowHold: {
      name: 'Hollow hold',
      steps: ['Lie on your back, press your lower back into the floor.',
        'Lift your head, shoulders and legs slightly off the floor, arms by your sides.', 'Hold the banana shape.'],
      tips: ['Lower back stays down; bend the knees if it lifts.'], easier: 'Knees bent.', harder: 'Arms overhead.',
      video: 'hollow hold beginner',
    },
    pallof: {
      name: 'Pallof press (band)',
      steps: ['Tie the band to a door handle at chest height and stand side-on to it.',
        'Hold the band at your chest with both hands, step away until it pulls.',
        'Press your hands straight out, resist being twisted, hold 2 s, bring them back.', 'All reps, then face the other way.'],
      tips: ['Hips and shoulders stay square; your trunk does the work.'], easier: 'Step closer to the door.', harder: 'Step further away.',
      video: 'pallof press band',
    },
    pushup: {
      name: 'Push-up (incline as needed)',
      steps: ['Hands on the kitchen counter (easiest), a chair or the floor, slightly wider than shoulders.',
        'Walk your feet back so your body is a straight line.',
        'Lower your chest to the edge with elbows about 45° from your body.', 'Push back up to straight arms.'],
      tips: ['Body moves as one plank; no sagging hips.', 'Pick a height where you can do every rep well.'],
      easier: 'Higher surface (counter).', harder: 'Lower surface, then the floor; slow 3 s down.',
      video: 'incline push up progression',
    },
    backpackRow: {
      name: 'One-arm row (backpack or dumbbell)',
      steps: ['Put one hand and one knee on a chair, other foot on the floor, back flat.',
        'Hold the backpack in the free hand, arm straight down.',
        'Pull your elbow up towards your hip until the bag reaches your ribs.', 'Lower slowly. All reps, then switch.'],
      tips: ['Pull with your back, not your arm; shoulder away from your ear.', 'Don\'t twist your trunk.'],
      easier: 'Lighter bag.', harder: 'Heavier bag, pause at the top.',
      video: 'one arm dumbbell row form',
    },
    tableRow: {
      name: 'Inverted row under a table',
      steps: ['Lie under a sturdy table and grip its edge, hands shoulder-width.',
        'Heels on the floor, body straight like a plank.',
        'Pull your chest up towards the table edge, then lower slowly.'],
      tips: ['Check the table can hold you before you start.', 'Squeeze your shoulder blades together at the top.'],
      easier: 'Bend your knees, feet flat.', harder: 'Straight legs, pause at the top.',
      video: 'inverted row under table at home',
    },
    press: {
      name: 'Overhead press (backpack or dumbbells)',
      steps: ['Sit or stand tall, hold the backpack at shoulder height with both hands (or a dumbbell in each).',
        'Brace your belly and press straight up until your arms are straight.', 'Lower to shoulder height with control.'],
      tips: ['Don\'t lean back; ribs stay down.'], easier: 'Seated, lighter load.', harder: 'Standing, heavier load.',
      video: 'seated dumbbell overhead press beginner',
    },
    halfKneelingPress: {
      name: 'Half-kneeling one-arm press',
      steps: ['Kneel on one knee (pad under it), other foot in front.',
        'Hold a weight at the shoulder on the same side as the down knee.', 'Press it up, lower slowly. All reps, then switch.'],
      tips: ['Squeeze the bum of the down leg to stay stable.'], easier: 'Lighter weight.', harder: 'Heavier, slower.',
      video: 'half kneeling single arm press',
    },
    pushPress: {
      name: 'Push press',
      steps: ['Stand with the weight at your shoulders.', 'Dip your knees a little, then drive up fast with your legs.',
        'Use that momentum to press the weight overhead.', 'Lower back to the shoulders.'],
      tips: ['Short dip, fast drive; the legs start it, the arms finish it.'], easier: 'Strict press.', harder: 'Heavier weight.',
      video: 'dumbbell push press form',
    },
    pullApart: {
      name: 'Band pull-apart (or prone Y-T raise)',
      steps: ['Band: hold it in front at shoulder height, arms straight; pull it apart until it touches your chest, return slowly.',
        'No band yet: lie on your stomach, lift your arms into a Y, then a T, thumbs up, hold 1 s each.'],
      tips: ['Shoulders down and back, don\'t shrug.'], easier: 'Lighter band or smaller range.', harder: 'Stronger band.',
      video: 'band pull apart form',
    },
    pulldown: {
      name: 'Band pulldown (or negative pull-up)',
      steps: ['Band anchored high (top of a door). Kneel, arms up holding the band.',
        'Pull your elbows down to your sides, chest up, then let the arms go back up slowly.',
        'With a pull-up bar: jump to the top and lower yourself over 3–5 seconds.'],
      tips: ['Think "elbows to back pockets".'], easier: 'Lighter band.', harder: 'Slower negatives.',
      video: 'band lat pulldown at home',
    },
    farmerCarry: {
      name: 'Farmer carry (shopping bags)',
      steps: ['Pick up two full shopping bags or the backpack plus a bag, one in each hand.',
        'Stand tall, shoulders down, and walk with short steady steps for the time given.', 'Put them down carefully, bending your knees.'],
      tips: ['No leaning; walk like you have a book on your head.'], easier: 'Lighter bags.', harder: 'Heavier bags or stairs.',
      video: 'farmers carry form',
    },
    suitcaseCarry: {
      name: 'Suitcase carry (one side)',
      steps: ['Hold one heavy bag in one hand only.', 'Walk tall without leaning to either side.', 'Switch hands and repeat.'],
      tips: ['Your trunk fights the lean: that is the exercise.'], easier: 'Lighter bag.', harder: 'Heavier bag.',
      video: 'suitcase carry exercise',
    },
    deadlift: {
      name: 'Deadlift from the floor (backpack or dumbbells)',
      steps: ['Put the backpack on the floor between your feet, feet hip-width.',
        'Hinge your hips back, bend your knees, grab the handles with a flat back.',
        'Brace your belly, push the floor away and stand up tall.', 'Lower it back down the same way.'],
      tips: ['Back stays flat the whole time; the bag stays close.', 'Breathe in and brace before each lift.'],
      easier: 'Put the bag on a low step so you lift from higher.', harder: 'Heavier bag or dumbbells.',
      video: 'kettlebell deadlift beginner',
    },
  };

  // Non-lifting blocks: what to do, in plain steps.
  const BLOCKS = {
    warmup: {
      name: 'Warm-up (8 min)',
      steps: ['2 min brisk march on the spot or easy skipping without a rope.',
        '1 round of: 10 hip circles each way, 10 arm circles each way, 10 bodyweight squats, 10 glute bridges,',
        '10 band pull-aparts (or Y-T raises), 5 inchworms (walk hands out to a plank and back).'],
      video: 'full body warm up 8 minutes beginner',
    },
    cooldown: {
      name: 'Cool-down (5 min)',
      steps: ['1 min slow breathing through the nose, lying or sitting.',
        '1 min hip flexor stretch per side (half-kneeling, push the hips forward).',
        '1 min chest stretch in a doorway (forearm on the frame, turn away gently).'],
      video: 'hip flexor stretch and doorway chest stretch',
    },
    stance: {
      name: 'Boxing stance and guard',
      steps: ['Right-handed: left foot forward, right foot back, feet shoulder-width, heels slightly up. (Left-handed: mirror it.)',
        'Knees soft, weight 50/50.', 'Hands up by your cheeks, elbows in, chin down behind your lead shoulder.'],
      video: 'boxing stance and guard for beginners',
    },
    footwork: {
      name: 'Footwork drill',
      steps: ['From stance: step forward with the front foot, then the back foot follows the same distance.',
        'Back: back foot first, front foot follows. Left: left foot first. Right: right foot first.',
        'Never cross your feet; keep the guard up the whole time.'],
      video: 'boxing footwork basics step drag',
    },
    jabCross: {
      name: 'Jab (1) and cross (2)',
      steps: ['Jab: snap the front hand straight out, turn the fist palm-down at the end, bring it straight back to your cheek.',
        'Cross: turn your back hip and back foot (like squashing a bug) and punch the back hand straight out, then back.',
        '1-2 = jab then cross. Exhale sharply with each punch ("tss").'],
      tips: ['Hands always return to the face.', 'Punch at 60–70 % speed while learning; form first.'],
      video: 'how to throw a jab and cross beginner',
    },
    hook: {
      name: 'Lead hook (3)',
      steps: ['From stance, turn on the front foot and hip; the front arm swings in a bent "L" at shoulder height.',
        'Elbow level with the fist, the punch comes from the body turn, not the arm.', '1-2-3 = jab, cross, lead hook.'],
      video: 'how to throw a lead hook beginner',
    },
    uppercut: {
      name: 'Rear uppercut',
      steps: ['Dip slightly to the back side, then drive up with the back leg and hip.',
        'The back fist comes up close to your body, palm facing you, to chin height.', 'Back to guard.'],
      video: 'rear uppercut beginner',
    },
    slipParry: {
      name: 'Slip and parry',
      steps: ['Slip: bend knees slightly and move your head just off the centre line to the left or right, like dodging a jab.',
        'Parry: with the back hand, tap an incoming jab to the side, small movement, then back to guard.',
        'Alternate: slip left, slip right, parry, for the time given.'],
      video: 'boxing slip and parry drill beginner',
    },
    fence: {
      name: 'The fence (self-defence)',
      steps: ['Open hands up in front of your chest, palms out, like calming someone down.',
        'Step back to keep distance and use a calm, firm voice ("Stop. Back off.").',
        'Your hands are already up to protect your face if needed.'],
      video: 'self defense fence position',
    },
    standUp: {
      name: 'Technical stand-up',
      steps: ['Sit on the floor, one hand behind you, the opposite foot flat, the other hand guarding your face.',
        'Lift your hips, swing the straight leg back under you, land in a staggered stance.',
        'Stand with your guard up, facing forward. Repeat on the other side.'],
      video: 'technical stand up self defense',
    },
    escapes: {
      name: 'Wrist grab and front grab escapes',
      steps: ['Wrist grab: turn your wrist towards the thumb side of the grip and pull out sharply, step back.',
        'Front grab (clothes): push hard at the chest or shoulders with both hands, step back, fence up.',
        'Practise slowly with a partner or by visualising; speed comes later.'],
      video: 'wrist grab escape beginner self defense',
    },
  };

  // Sessions per phase. ex: [key, prescription]; skill: [blockKey...] with the time plan.
  const P1 = {
    A: { focus: 'Lower body + boxing basics', rest: '60–90 s between sets',
      ex: [['chairSquat', '3 × 10'], ['rdl', '3 × 10'], ['reverseLunge', '2 × 8 per leg'], ['gluteBridge', '2 × 15'], ['deadBug', '3 × 8 per side']],
      skill: { name: 'Boxing (12 min)', plan: '3 × 2 min footwork, 1 min rest. Then 3 × 2 min shadowboxing: jab only, then 1-2.', blocks: ['stance', 'footwork', 'jabCross'] } },
    B: { focus: 'Upper body + conditioning', rest: '60–90 s between sets',
      ex: [['pushup', '3 × 8–12'], ['backpackRow', '3 × 10 per side'], ['press', '3 × 10'], ['pullApart', '2 × 15'], ['farmerCarry', '3 × 40 s']],
      skill: { name: 'Conditioning (10 min)', plan: '5 rounds: 1 min brisk shadowboxing (1-2 combos) at RPE 6, then 1 min easy walking.', blocks: ['jabCross'] } },
    C: { focus: 'Full body + self-defence', rest: '60–90 s between sets',
      ex: [['deadlift', '3 × 8'], ['splitSquat', '2 × 8 per leg'], ['tableRow', '3 × 10'], ['plank', '3 × 20–30 s'], ['sidePlank', '2 × 20 s per side']],
      skill: { name: 'Self-defence (12 min)', plan: 'Fence and distance. Slip and parry 3 × 1 min. Technical stand-up 3 × 5 per side. Jab-cross then step back out, 3 × 1 min.', blocks: ['fence', 'slipParry', 'standUp', 'jabCross'] } },
  };
  const P2 = {
    A: { focus: 'Lower body + boxing', rest: '90 s on squats and deadlifts',
      ex: [['chairSquat', '4 × 8'], ['rdl', '3 × 8'], ['walkingLunge', '3 × 8 per leg'], ['hipThrust', '3 × 10'], ['pallof', '3 × 10 per side']],
      skill: { name: 'Boxing (15 min)', plan: '5 × 2 min shadowboxing, 1 min rest. Add the lead hook (1-2-3) and move after each combo.', blocks: ['jabCross', 'hook', 'footwork'] } },
    B: { focus: 'Upper body + conditioning', rest: '90 s on the main lifts',
      ex: [['pushup', '4 × 8–10'], ['backpackRow', '4 × 10 per side'], ['halfKneelingPress', '3 × 8 per side'], ['pulldown', '3 × 8'], ['suitcaseCarry', '3 × 30 m per side']],
      skill: { name: 'Conditioning (12 min)', plan: '6 rounds: 40 s hard (fast shadowboxing) at RPE 7–8, then 80 s easy. Only after your doctor has cleared you; until then keep it at RPE 6.', blocks: ['jabCross', 'hook'] } },
    C: { focus: 'Class, or full body at home', rest: '90 s on deadlifts',
      ex: [['deadlift', '4 × 6'], ['stepUp', '3 × 8 per leg'], ['tableRow', '3 × 10'], ['pushPress', '3 × 8'], ['hollowHold', '3 × 20 s']],
      skill: { name: 'Self-defence', plan: 'Add wrist-grab and front-grab escapes, and the combo 1-2, slip, 2.', blocks: ['escapes', 'slipParry', 'fence'] } },
  };
  const heavier = s => ({ ...s, rest: '2 min on the first two exercises, 60–90 s on the rest',
    ex: s.ex.map(([k], i) => [k, i < 2 ? '4 × 5–6 (heavier)' : '3 × 10–12']),
    skill: { ...s.skill, name: s.skill.name.replace(/\(.*\)/, '(6 rounds)'), plan: '6 × 3 min rounds, 1 min rest. Add the rear uppercut and covering up against a hook.', blocks: [...s.skill.blocks, 'uppercut'] } });
  const P3 = { A: heavier(P2.A), B: heavier(P2.B), C: { ...heavier(P2.C), skill: { ...P2.C.skill, plan: 'Keep the weekly class if you joined one. At home: repeat all self-defence drills, then 3 × 3 min of 1-2, slip, 2 with movement.' } } };

  const phaseFor = week => (week <= 4 ? { n: 1, name: 'Foundation', s: P1 } : week <= 8 ? { n: 2, name: 'Build', s: P2 } : { n: 3, name: 'Progress', s: P3 });
  const weekNote = week => week === 4 || week === 8 ? 'Light week: same exercises, one set fewer on each.'
    : week === 12 ? 'Test week: light sessions, then retest push-ups, plank, squat weight and shadowboxing rounds (see the Stats tab).'
    : week <= 2 ? 'Weeks 1–2: lower end of the reps, light load, perfect form.'
    : week > 12 ? 'The 12-week block is done. Repeat phase 3 until the next block is planned.' : '';

  const RPE = 'Effort (RPE): 6 = working but you can talk in full sentences; 7 = hard, 3 reps left; 8 = very hard, 2 reps left. Finish every set with 2–3 reps left. Never go to failure.';
  const PROGRESS = 'Progress: when you reach the top of the reps on all sets at RPE 7, make it a bit harder next time (heavier backpack, lower surface or slower lowering).';
  const SAFETY = 'Stop and get help if you feel chest pain or pressure, dizziness, breathlessness that doesn\'t settle within 2–3 minutes, or palpitations. Sharp joint pain: stop that exercise and use the easier version.';

  return { EX, BLOCKS, P1, P2, P3, phaseFor, weekNote, RPE, PROGRESS, SAFETY, yt };
})();
