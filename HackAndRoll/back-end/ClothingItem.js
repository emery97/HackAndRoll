// ClothingItem.js (Backend)
class ClothingItem {
    constructor(id, type, name, color, formal, temperatureRange, lastWorn, attributes = {}) {
      this.id = id; // Unique identifier
      this.type = type; // 'top', 'bottom', 'outerwear', 'accessory'
      this.name = name; // e.g., 'Blue T-Shirt'
      this.color = color; // e.g., 'blue'
      this.formal = formal; // e.g., 'casual' 'smart casual' 'formal'
      this.temperatureRange = temperatureRange; // { min: 15, max: 30 }
      this.lastWorn = lastWorn; // Date object or timestamp
      this.attributes = attributes; // Category-specific attributes
      this.image = null; // Base64 image string
    }
  }
  
  module.exports = ClothingItem;
  