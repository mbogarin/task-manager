// Ensures proper type checking when working w/ authenticated users.
export interface Auth0User {
	sub: string;
	name?: string;
	email?: string;
	picture?: string;
}
