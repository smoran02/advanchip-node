module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	var gatewaySchema = new Schema(
		{
			gatewayID: { type: String, unique: true, lowercase: true, trim: true },
			admins: { type: [String] },
			users: { type: [String] },
			hostname: { type: String },
			lights: [{ 
				light_id: { type: String, unique: true, trim: true },
				state: { type: Boolean }  
			}]
		});
	mongoose.model('Gateway', gatewaySchema);
}