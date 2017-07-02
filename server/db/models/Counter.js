import mongoose, { Schema } from 'mongoose';

let CounterSchema = new Schema({
	objectName: {type: String, required: true, index: true, unique: true},
	next: {type: Number, default: 1000}
}, {
	strict: true
});

CounterSchema.statics.increment = async objectName => {
	await this.collection.findAndModify({objectName: objectName}, [], {$inc: {next: 1}});
};

export default mongoose.model('Counter', CounterSchema);
