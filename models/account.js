module.exports = function(mongoose) {
	var Schema = mongoose.Schema;
	var accountSchema = new Schema(
		{
			username: { type: String, lowercase: true, trim: true },
			password: { type: String },
			first_name: { type: String, trim: true },
			last_name: { type: String, trim: true },
			email: { type: String }
		});
	mongoose.model('Account', accountSchema);
}