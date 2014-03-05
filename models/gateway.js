module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	var gatewaySchema = new Schema(
		{
			gatewayID: { type: String, unique: true, lowercase: true, trim: true },
			name: { type: String, unique: true, trim: true },
			users: [{
				name: { type: String },
				permissions: { type: String }
			}],
			hostname: { type: String },
			floors: [{
				name: { type: String },
				image: { type: String },
				description: { type: String }
			}],
			rooms: [{
				name: { type: String },
				image: { type: String },
				description: { type: String },
				floor: { type: String }
			}],
			switches: [{
				name: { type: String },
				switch_id: { type: String, trim: true },
				state: { type: Boolean },
				floor: { type: String },
				room: { type: String }
			}]
		});
	mongoose.model('Gateway', gatewaySchema);
}

