export const ARKNIGHTS = {};

/**
 * The set of Ability Scores used within the sytem.
 * @type {Object}
 */
 ARKNIGHTS.abilities = {
  "att": "ARKNIGHTS.AbilityAtt",
  "spd": "ARKNIGHTS.AbilitySpd",
  "con": "ARKNIGHTS.AbilityCon",
  "mov": "ARKNIGHTS.AbilityMov",
  "art": "ARKNIGHTS.AbilityArt"
};

ARKNIGHTS.abilityAbbreviations = {
  "att": "ARKNIGHTS.AbilityAttAbbr",
  "spd": "ARKNIGHTS.AbilitySpdAbbr",
  "con": "ARKNIGHTS.AbilityConAbbr",
  "mov": "ARKNIGHTS.AbilityMovAbbr",
  "art": "ARKNIGHTS.AbilityArtAbbr"
};

ARKNIGHTS.valueToRank = ["D","C","B","A","S","S+"];

ARKNIGHTS.rankToDie = {
  "D": "d4",
  "C": "d6",
  "B": "d8",
  "A": "d10",
  "S": "d12",
  "S+": "d14",
};