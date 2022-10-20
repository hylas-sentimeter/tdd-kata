import mongoose from 'mongoose';

interface ISecretSchema extends mongoose.Document {
    secret: string;
    urlId: string;
}

const SecretSchema = new mongoose.Schema({
    secret: String,
    urlId: String
});

export const SecretModel = mongoose.model<ISecretSchema>('Secrets', SecretSchema);

