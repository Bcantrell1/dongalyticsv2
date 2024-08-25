import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileCardProps {
  profile: any;
  rankName: string;
}

export function ProfileCard({ profile, rankName }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile.profile.avatarfull} alt={profile.profile.personaname} />
          <AvatarFallback>{profile.profile.personaname.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{profile.profile.personaname}</p>
          <p className="text-sm text-gray-500">Rank: {rankName}</p>
          {profile.leaderboard_rank && (
            <p className="text-sm text-gray-500">Leaderboard Rank: {profile.leaderboard_rank}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}