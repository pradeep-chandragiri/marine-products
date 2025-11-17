import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("skeleton", className)} 
      role="status"
      aria-label="Loading..."
      {...props} 
    />
  );
}

// Skeleton Variants
function SkeletonText({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Skeleton className={cn("skeleton-text", className)} {...props} />;
}

function SkeletonTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Skeleton className={cn("skeleton-title", className)} {...props} />;
}

function SkeletonAvatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Skeleton className={cn("skeleton-avatar", className)} {...props} />;
}

function SkeletonButton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Skeleton className={cn("skeleton-button", className)} {...props} />;
}

function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Skeleton className={cn("skeleton-card", className)} {...props} />;
}

function SkeletonImage({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <Skeleton className={cn("skeleton-image", className)} {...props} />;
}

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonTitle, 
  SkeletonAvatar, 
  SkeletonButton, 
  SkeletonCard,
  SkeletonImage
};
