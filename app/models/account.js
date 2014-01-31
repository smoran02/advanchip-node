module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	var accountSchema = new Schema(
		{
			username: { type: String },
			password: { type: String }
		});
	mongoose.model('Account', accountSchema);
}