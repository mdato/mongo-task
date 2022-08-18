import mongoose from "mongoose";

const DB = process.env.DB_URL;

if (!DB) {
	throw new Error(
		"Define environment variable inside .env.local"
	);
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { connection: null, promise: null };
}

const dbConnect = async () => {
	if (cached.connection) {
		return cached.connection;
	}

	if (!cached.promise) {
		const options = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};

		cached.promise = mongoose.connect(DB, options).then((mongoose) => {
			return mongoose;
		});
	}
	cached.connection = await cached.promise;
	return cached.connection;
};

export default dbConnect;
