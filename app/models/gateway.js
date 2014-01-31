module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	var gatewaySchema = new Schema(
		{
			gatewayID: { type: String },
			admins: { type: [String] },
			users: { type: [String] },
			lights: { type: [ { light_id: String, state: Boolean } ] }
		});
	mongoose.model('Gateway', gatewaySchema);
}