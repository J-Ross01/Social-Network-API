const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const ReactionSchema = require('../Reaction'); 

const Reaction = mongoose.model('Reaction', ReactionSchema);

describe('Reaction Model Test', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  }, 30000); 

  afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it('create & save reaction successfully', async () => {
    const validReaction = new Reaction({
      reactionBody: 'This is a test reaction',
      username: 'testuser'
    });
    const savedReaction = await validReaction.save();
    
    expect(savedReaction._id).toBeDefined();
    expect(savedReaction.reactionBody).toBe(validReaction.reactionBody);
    expect(savedReaction.username).toBe(validReaction.username);
    expect(savedReaction.createdAt).toBeDefined();
  });

  it('insert reaction successfully, but the field not defined in schema should be undefined', async () => {
    const reactionWithInvalidField = new Reaction({
      reactionBody: 'This is a test reaction',
      username: 'testuser',
      notInSchema: true
    });
    const savedReactionWithInvalidField = await reactionWithInvalidField.save();
    expect(savedReactionWithInvalidField._id).toBeDefined();
    expect(savedReactionWithInvalidField.notInSchema).toBeUndefined();
  });

  it('create reaction without required field should fail', async () => {
    const reactionWithoutRequiredField = new Reaction({ username: 'testuser' });
    let err;
    try {
      await reactionWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.reactionBody).toBeDefined();
  });
});
