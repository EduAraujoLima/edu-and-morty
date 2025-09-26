export class AddCharacterToFavorites {
  static readonly type = '[Characters] Add character to favorites';
  constructor(public payload: number) {}
}

export class RemoveCharacterFromFavorites {
  static readonly type = '[Characters] Remove character from favorites';
  constructor(public payload: number) {}
}

export class FetchFavoriteCharacters {
  static readonly type = '[Characters] Fetch favorite characters';
}
