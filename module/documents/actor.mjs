/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class ArknightsActor extends Actor {

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.arknights || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData(actorData);
    this._prepareEnemyData(actorData);
    this._prepareSupportData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, ability] of Object.entries(systemData.abilities)) {
      // Calculate the modifier using d20 rules.
      ability.rank = ability.value<=6?CONFIG.ARKNIGHTS.valueToRank[ability.value-1]:"S+"+"+".repeat(ability.value-6);
      ability.die = CONFIG.ARKNIGHTS.rankToDie[ability.rank];
    }
    systemData.diceNumber = [1,2,3,4,5,6][systemData.abilities.spd.value-1];
    systemData.health.max = [2,4,6,8,10,12][systemData.abilities.con.value-1];
    systemData.movBonus = [0,0,1,1,2,2][systemData.abilities.mov.value-1];
    systemData.KOLength = [4,3,2,2,1,1][systemData.abilities.mov.value-1];
    systemData.artsCards = systemData.abilities.mov.value-1;
    systemData.attributes.exposure.max = [4,6,8,10,12,14][systemData.abilities.con.value-1];
  }

  /**
   * Prepare Enemy type specific data.
   */
  _prepareEnemyData(actorData) {
    if (actorData.type !== 'enemy') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;
    systemData.xp = (systemData.cr * systemData.cr) * 100;
  }

  /**
   * Prepare Support type specific data.
   */
  _prepareSupportData(actorData) {
    if (actorData.type !== 'support') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;
    systemData.xp = (systemData.cr * systemData.cr) * 100;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    // Prepare character roll data.
    this._getCharacterRollData(data);
    this._getEnemyRollData(data);
    this._getSupportRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.type !== 'character') return;

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (data.abilities) {
      for (let [k, v] of Object.entries(data.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Add level for easier access, or fall back to 0.
    if (data.attributes.level) {
      data.lvl = data.attributes.level.value ?? 0;
    }
  }

  /**
   * Prepare NPC roll data.
   */
  _getEnemyRollData(data) {
    if (this.type !== 'enemy') return;

    // Process additional NPC data here.
  }

  /**
   * Prepare Support roll data.
   */
  _getSupportRollData(data) {
    if (this.type !== 'support') return;

    // Process additional NPC data here.
  }

}