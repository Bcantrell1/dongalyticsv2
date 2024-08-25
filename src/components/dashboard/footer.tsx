import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
			<p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            Built by with ❤️ by{" "}
            <Link
              href="https://github.com/bcantrell1"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Can1rell
            </Link>
            . The source code is available here{" "}
            <Link
              href="https://github.com/bcantrell1/dongalytics"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
      </div>
    </div>
  );
}
