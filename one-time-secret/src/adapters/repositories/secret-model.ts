import mongoose from 'mongoose';

interface ISecretSchema extends mongoose.Document {
    secret: string;
    urlId: string;
}

const secretSchema = new mongoose.Schema({
    secret: String,
    urlId: String
});

export let SecretModel = mongoose.model<ISecretSchema>('Secrets', secretSchema);