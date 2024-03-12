const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Thought = require('../Thought'); 

describe('Thought Model Test', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('create & save thought successfully', async () => {
    const validThought = new Thought({
      thoughtText: 'This is a thought',
      username: 'user1'
    });
    const savedThought = await validThought.save();

    expect(savedThought._id).toBeDefined();
    expect(savedThought.thoughtText).toBe(validThought.thoughtText);
    expect(savedThought.username).toBe(validThought.username);
    expect(savedThought.createdAt).toBeDefined();
    expect(savedThought.reactions).toEqual(expect.arrayContaining([]));
    expect(savedThought.reactionCount).toBe(0);
  });

  it('add reaction to thought', async () => {
    const thought = new Thought({
      thoughtText: 'This is a new thought',
      username: 'user2'
    });

    thought.reactions.push({
      reactionBody: 'Great thought!',
      username: 'commenter'
    });

    const savedThought = await thought.save();

    expect(savedThought.reactions.length).toBe(1);
    expect(savedThought.reactionCount).toBe(1);
  });

  it('should fail if required fields are missing', async () => {
    const thoughtWithoutRequiredField = new Thought({ username: 'user3' });
    let err;
    try {
      await thoughtWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.thoughtText).toBeDefined();
  });
});

