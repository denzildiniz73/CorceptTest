const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
  },
  flower_tags: {
    type: mongoose.Schema.Types.Mixed, // This allows for JSON objects
    required: [true, 'Flower tags are required'],
    default: {}
  },
  attribution_preference: {
    type: Boolean,
    required: [true, 'Attribution preference is required'],
    default: false
  },
  describe_yourself: {
    type: Boolean,
    required: [true, 'Describe yourself preference is required'],
    default: false
  },
  healthcare_confirmation: {
    type: Number,
    required: [true, 'Healthcare confirmation is required'],
    min: [0, 'Healthcare confirmation must be a positive number']
  },
  adult_check: {
    type: Boolean,
    required: [true, 'Adult check confirmation is required'],
    default: false
  },
  interested_check: {
    type: Boolean,
    required: [true, 'Interest confirmation is required'],
    default: false
  },
  audio_story_url: {
    type: String,
    required: [true, 'Audio story URL is required'],
    trim: true,
  },
  flower_url: {
    type: String,
    required: [true, 'Flower URL is required'],
    trim: true,
  }
}, {
  timestamps: true 
});

// Virtual for story ID (without _id)
storySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialized
storySchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Static method to find stories by email
storySchema.statics.findByEmail = function(email) {
  return this.find({ email: email.toLowerCase() });
};

// Static method to find stories by name
storySchema.statics.findByName = function(name) {
  return this.find({ name: { $regex: name, $options: 'i' } });
};

// Static method to find stories with specific flower tags
storySchema.statics.findByFlowerTags = function(tags) {
  return this.find({ 'flower_tags': { $in: tags } });
};

const Story = mongoose.models.Story || mongoose.model('Story', storySchema);

module.exports = Story; 