
interface DiscordMemberType {
  nick: string;
  joined_at: string;
  user: DiscordUserType;
}

interface DiscordUserType {
  id: string;
  username: string;
  avatar: string;
}