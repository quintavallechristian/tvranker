const fs = require('fs');
const base = '/Users/christianquintavalle/Documents/tvranker/packages/web/src/messages/';

const en = JSON.parse(fs.readFileSync(base + 'en.json', 'utf8'));
en.listSettings.useCustomVisibility = 'Use custom visibility';
en.listSettings.usingCustomVisibility = 'Override profile default visibility for this list';
en.listSettings.usingProfileVisibility = 'Using profile default visibility';
en.profile.visibilityTitle = 'Default Visibility';
en.profile.visibilityDesc = 'Default visibility for all your lists. Each list can override in its own settings.';
fs.writeFileSync(base + 'en.json', JSON.stringify(en, null, 2) + '\n');

const it = JSON.parse(fs.readFileSync(base + 'it.json', 'utf8'));
it.listSettings.useCustomVisibility = 'Usa visibilità personalizzata';
it.listSettings.usingCustomVisibility = 'Sovrascrive la visibilità predefinita del profilo per questa lista';
it.listSettings.usingProfileVisibility = 'Usa la visibilità predefinita del profilo';
it.profile.visibilityTitle = 'Visibilità predefinita';
it.profile.visibilityDesc = 'Visibilità predefinita per tutte le tue liste. Ogni lista può sovrascriverla nelle proprie impostazioni.';
fs.writeFileSync(base + 'it.json', JSON.stringify(it, null, 2) + '\n');

console.log('i18n updated successfully');
