export type ItemType = {
  id: string;
  title: string;
  complete: boolean;
  userId: string;
}

export type Session = {
  token: string;
  expiresAt: string;
  userId: string;
}

export type PageType = {
  id: string;
  userId: string;
  name: string;
  after: string;
  data: string;
}
