/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class ArknightsItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor class, items are documents that can have their data
    // preparation methods overridden (such as prepareBaseData()).
    super.prepareData();
  }


  /**
   * @override
   * Augment the basic item data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const itemData = this;
    const systemData = itemData.system;
    const flags = itemData.flags.arknights || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareActionData(itemData);
    this._prepareFeatureData(itemData);
    this._prepareSpellData(itemData);
    this._prepareItemData(itemData);
  }


  /**
   * Prepare Action type specific data.
   */
  _prepareActionData(itemData) {
    if (itemData.type !== 'action') return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
  }


  /**
   * Prepare Feature type specific data.
   */
  _prepareFeatureData(itemData) {
    if (itemData.type !== 'feature') return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
  }


  /**
   * Prepare Spell type specific data.
   */
  _prepareSpellData(itemData) {
    if (itemData.type !== 'spell') return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
  }


  /**
   * Prepare Item type specific data.
   */
  _prepareItemData(itemData) {
    if (itemData.type !== 'item') return;

    // Make modifications to data here. For example:
    const systemData = itemData.system;
  }


  /**
   * Prepare a data object which is passed to any Roll formulas which are created related to this Item
   * @private
   */
   getRollData() {
    // If present, return the actor's roll data.
    if ( !this.actor ) return null;
    const rollData = this.actor.getRollData();
    // Grab the item's system data as well.
    rollData.item = foundry.utils.deepClone(this.system);

    return rollData;
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    const item = this;

    // Initialize chat data.
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    const label = `[${item.type}] ${item.name}`;

    // If there's no roll data, send a chat message.
    if (!this.system.formula) {
      ChatMessage.create({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
        content: item.system.description ?? ''
      });
    }
    // Otherwise, create a roll and send a chat message from it.
    else {
      // Retrieve roll data.
      const rollData = this.getRollData();

      // Invoke the roll and submit it to chat.
      const roll = new Roll(rollData.item.formula, rollData);
      // If you need to store the value first, uncomment the next line.
      // let result = await roll.roll({async: true});
      roll.toMessage({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
      });
      return roll;
    }
  }
}
