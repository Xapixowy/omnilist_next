import { env } from '@/env';
import { Result, tryCatch } from '@/functions/try-catch';
import { Account, AppwriteException, Client, ID, Models } from 'appwrite';

export class AuthClient {
  static #instance: AuthClient | undefined;

  private readonly client = new Client();
  private readonly account: Account;

  private constructor() {
    // FIXME: Migrate to NEXT api
    this.client.setEndpoint(env.APPWRITE_URL).setProject(env.APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  static getInstance(): AuthClient {
    if (!this.#instance) {
      this.#instance = new AuthClient();
    }

    return this.#instance;
  }

  async getUser(): Promise<Result<Models.User<Models.Preferences>, AppwriteException>> {
    return await tryCatch<Models.User<Models.Preferences>, AppwriteException>(this.account.get());
  }

  async register(
    email: string,
    password: string,
    name?: string,
  ): Promise<Result<Models.User<Models.Preferences>, AppwriteException>> {
    return await tryCatch<Models.User<Models.Preferences>, AppwriteException>(
      this.account.create(ID.unique(), email, password, name),
    );
  }

  async verify(): Promise<Result<Models.Token, AppwriteException>> {
    return await tryCatch<Models.Token, AppwriteException>(this.account.createVerification(env.FRONTEND_URL));
  }

  async completeVerification(userId: string, secret: string): Promise<Result<Models.Token, AppwriteException>> {
    return await tryCatch<Models.Token, AppwriteException>(this.account.updateVerification(userId, secret));
  }

  async login(email: string, password: string): Promise<Result<Models.Session, AppwriteException>> {
    return await tryCatch<Models.Session, AppwriteException>(this.account.createEmailPasswordSession(email, password));
  }

  async logout(): Promise<Result<object, AppwriteException>> {
    return await tryCatch<object, AppwriteException>(this.account.deleteSession('current'));
  }
}
