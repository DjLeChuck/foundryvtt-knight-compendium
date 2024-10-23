Hooks.on('init', () => {
  const module = {
    module: 'knight-compendium',
    lang: 'en',
    dir: 'translations/en',
  };

  if (foundry.utils.isNewerVersion(game.version, 12)) {
    if (game.babele !== 'undefined') {
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
  processPackVisibility('include-capacitecodex', 'knight-compendium.armours-codex');
  processPackVisibility('include-capaciteatlas', 'knight-compendium.armours-atlas');
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
