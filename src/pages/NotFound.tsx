import { useSeoMeta } from "@unhead/react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Film } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  useSeoMeta({
    title: "404 — Page Not Found | CutForge Studio",
    description:
      "The page you are looking for could not be found. Return to CutForge Studio to explore features, pricing, tutorials and downloads.",
  });

  return (
    <SiteLayout>
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/20">
          <Film className="size-8" />
        </span>
        <p className="mt-6 font-display text-6xl font-bold text-gradient">404</p>
        <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          That take didn’t make the cut
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          The page you were looking for is not on the timeline. Let’s get you back
          to the edit.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="shadow-lg shadow-primary/20">
            <Link to="/">
              <Home />
              Back to home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/tutorials">
              <ArrowLeft />
              Browse tutorials
            </Link>
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
};

export default NotFound;