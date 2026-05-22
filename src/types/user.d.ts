type UserSave = {
  group_id: number;
  name: string;
  username?: string | null;
  email: string;
  password?: string | null;
  picture?: string | null;
  biodata: string | null;
};

type ProfileSave = {
  name: string;
  email: string;
  password?: string | null;
  biodata: string | null;
};
