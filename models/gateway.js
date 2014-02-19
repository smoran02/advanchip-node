module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	var gatewaySchema = new Schema(
		{
			gatewayID: { type: String, unqiue: true },
			admins: { type: [String] },
			users: { type: [String] },
			hostname: { type: String },
			lights: { type: [ { light_id: String, state: Boolean } ] }
		});
	mongoose.model('Gateway', gatewaySchema);
}