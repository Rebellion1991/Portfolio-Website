import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Page not found
          </h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">Go back home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact me</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
