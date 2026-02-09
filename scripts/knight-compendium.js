Hooks.on('init', () => {
  const module = {
    module: 'knight-compendium',
    lang: 'en',
    dir: 'translations/en',
  };

  if (foundry.utils.isNewerVersion(game.version, 12)) {
    if (game.babele) {
      game.babele.register(module);
    }
  } else {
    if (typeof Babele !== 'undefined') {
      Babele.get().register(module);
    }
  }
});

Hooks.on('ready', () => {
  processPackVisibility('include-capacite2038', 'knight-compendium.armours-2038');
  processPackVisibility('include-capacite2038necromancer', 'knight-compendium.armours-2038-necromancer');
  processPackVisibility('include-capacite2038sorcerer', 'knight-compendium.armours-2038-sorcerer');
  processPackVisibility('include-capacitecodex', 'knight-compendium.armours-codex');
  processPackVisibility('include-capaciteatlas', 'knight-compendium.armours-atlas');
  processPackVisibility('include-capaciteatlasspecial', 'knight-compendium.armours-atlas-berserk');
  processAdlVisibility();
});

Hooks.on('knightSettingsChange', setting => {
  switch (setting) {
    case 'include-capacite2038':
      processPackVisibility(setting, 'knight-compendium.armours-2038');
      break;
    case 'include-capacitecodex':
      processPackVisibility(setting, 'knight-compendium.armours-codex');
      break;
    case 'include-capaciteatlas':
      processPackVisibility(setting, 'knight-compendium.armours-atlas');
      break;
    case 'include-capacite2038necromancer':
      processPackVisibility(setting, 'knight-compendium.armours-2038-necromancer');
      break;
    case 'include-capacite2038sorcerer':
      processPackVisibility(setting, 'knight-compendium.armours-2038-sorcerer');
      break;
    case 'include-capaciteatlasspecial':
      processPackVisibility(setting, 'knight-compendium.armours-atlas-berserk');
      break;
    case 'adl':
      processAdlVisibility();
      break;
  }
});

function processPackVisibility(setting, packName) {
  if (!game.user.isGM) {
    return;
  }

  const hideToPlayers = !game.settings.get('knight', setting);
  const ownershipLevel = hideToPlayers ? 'LIMITED' : 'OBSERVER';

  game.packs.get(packName).configure({
    private: hideToPlayers,
    ownership: {
      PLAYER: ownershipLevel,
      TRUSTED: ownershipLevel,
    },
  });
}

async function processAdlVisibility() {
  const hasSetting = game.settings.settings.has('knight.adl');

  if (!game.user.isGM) {
    return;
  }

  if (!hasSetting) {
    return;
  }

  const setting = game.settings.get('knight', 'adl');
  const std = setting;
  const adl = !setting;
  const ownershipStdLevel = std ? 'LIMITED' : 'OBSERVER';
  const ownershipAdlLevel = adl ? 'LIMITED' : 'OBSERVER';

  const listStd = [
    'knight-compendium.overdrives',
    'knight-compendium.weapons-standard',
    'knight-compendium.weapons-avance',
    'knight-compendium.weapons-rare',
    'knight-compendium.modules-standard',
    'knight-compendium.modules-avance',
    'knight-compendium.modules-rare'];
  const listAdl = [
    'knight-compendium.adl-overdrives',
    'knight-compendium.adl-armes-1-standard',
    'knight-compendium.adl-modules-1-standard'];

  for (const p of listStd) {
    await game.packs.get(p).configure({
      private: std,
      ownership: {
        PLAYER: ownershipStdLevel,
        TRUSTED: ownershipStdLevel,
      },
    });
  }

  for (const p of listAdl) {
    await game.packs.get(p).configure({
      private: adl,
      ownership: {
        PLAYER: ownershipAdlLevel,
        TRUSTED: ownershipAdlLevel,
      },
    });
  }
}
