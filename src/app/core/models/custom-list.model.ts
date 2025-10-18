import { Character } from './character.model';

export interface CustomList {
  id: string;
  name: string;
  description?: string;
  characters: Character[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateListDto {
  name: string;
  description?: string;
}

export interface UpdateListDto {
  name?: string;
  description?: string;
}
