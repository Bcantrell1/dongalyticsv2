import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

import { SignIn } from "@/components/login/Buttons";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Logo from '../../public/dong_logo.png';

export default async function HomePage() {
  const session = await getServerSession()

	if(session) {
		redirect('/dashboard');
	}

  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
        <div className="container h-14 flex items-center">
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
          >
						<Image src={Logo} alt="Logo" height={66} width={44} className="mr-2" />
            <span className="font-bold">Dongalytics</span>
            <span className="sr-only">Dongalytics</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 bg-background"
              asChild
            >
              <Link href="https://github.com/bcantrell1/">
                <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="container relative pb-10">
          <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              Dongalytics, Analytics for the Dong Guild <br/><span className="text-primary">TURBO ONLY</span>
            </h1>
            <span className="max-w-[750px] text-center text-lg font-light text-foreground">
							Providing the ability to have up to date measurement of your dong size. Along side other useless information related to your terrible Dota 2 stats.
            </span>
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
							<SignIn />
            </div>
          </section>
          <div className="w-full flex justify-center relative">
						<Image
              src="/placeholder.png"
              alt="Placeholder Image"
              width={500}
              height={500}
              priority
            /> 
          </div>
        </div>
      </main>
      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
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
      </footer>
    </div>
  );
}
