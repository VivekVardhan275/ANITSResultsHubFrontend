import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function StudentProfilePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                <p className="text-muted-foreground">View and manage your account details.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Your personal and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="https://picsum.photos/200" data-ai-hint="profile avatar" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-semibold">Student Name</h2>
                            <p className="text-muted-foreground">321126510001</p>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">student@anits.edu.in</p>
                     </div>
                     <div className="space-y-2">
                        <h3 className="font-semibold">Department</h3>
                        <p className="text-muted-foreground">Computer Science & Engineering</p>
                     </div>
                     <Button>Edit Profile</Button>
                </CardContent>
            </Card>
        </div>
    )
}
