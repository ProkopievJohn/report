import { Schema, model } from 'mongoose';

let CounterSchema = new Schema({
	objectName: {type: String, required: true, index: true, unique: true},
	next: {type: Number, default: 1000}
}, {
	strict: true
});

CounterSchema.statics.increment = async (objectName, callback) => {
	await this.collection.findAndModify({objectName: objectName}, [], {$inc: {next: 1}}, callback);
};

export default model('Counter', CounterSchema);
