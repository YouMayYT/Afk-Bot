const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const { GoalNear } = require('mineflayer-pathfinder').goals;

const bot = mineflayer.createBot({
  host: 'me.unknown.play.hosting',
  port: 25565,
  username: 'AFKMe'
});

// Load pathfinder plugin
bot.loadPlugin(pathfinder);

// Define positions
const pos1 = { x: 10, y: 25, z: 28 };
const pos2 = { x: 16, y: 25, z: 28 };

let currentTarget = pos1;

bot.once('spawn', () => {
  console.log('Bot spawned!');
  moveToTarget();
});

bot.on('goal_reached', () => {
  console.log('Reached target! Switching...');
  setTimeout(moveToTarget, 1000); // Wait 1 second before moving again
});

bot.on('error', err => console.log('Error:', err));
bot.on('kicked', reason => console.log('Kicked:', reason));

function moveToTarget() {
  // Switch targets
  currentTarget = currentTarget === pos1 ? pos2 : pos1;
  
  const goal = new GoalNear(
    currentTarget.x,
    currentTarget.y,
    currentTarget.z,
    1 // Acceptable distance from target
  );

  bot.pathfinder.setGoal(goal);
  console.log(`Moving to ${JSON.stringify(currentTarget)}`);
}
