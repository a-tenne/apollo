export interface ItemDTO {
  id: number;
  title: string;
  contents: string;
  completed: boolean;
  creationDate: string;
}

export interface ItemCreateDTO {
  title: string;
  contents: string;
}
