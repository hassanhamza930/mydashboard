export interface IUser {
  name: string;
  email: string;
  photoURL?: string;
  uid: string;
  plan?: string;
}

export interface IGroup {
  name: string;
  user: string;
  id: string;
  icon: string;
  color: string;
}

export interface IFrame {
  name: string;
  link: string;
  id: string;
  width: number;
  height: number;
  groupId?: string;
  xPosition?: number;
  yPosition?: number;
  zoom?: number;
}
