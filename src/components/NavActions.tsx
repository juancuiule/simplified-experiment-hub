import { LogoutButton } from "./LogoutButton";
import { ProfilePicture } from "./ProfilePicture";

export default function NavActions() {
  return (
    <div className="flex flex-row gap-2">
      <ProfilePicture />
      <LogoutButton />
    </div>
  );
}
