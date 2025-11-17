import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton, SkeletonButton } from "@/components/ui/skeleton";

export const SkeletonProductCard = () => {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <Skeleton className="h-full w-full" />
      </div>
      
      {/* Header with title and badge */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>

      {/* Content with description and hygiene badge */}
      <CardContent className="pb-3 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-6 w-32 rounded-full" />
      </CardContent>

      {/* Footer with price and button */}
      <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
        <SkeletonButton />
      </CardFooter>
    </Card>
  );
};
