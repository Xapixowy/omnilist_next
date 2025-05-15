type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className = '', ...props }: SkeletonProps) {
  return <div className={`animate-pulse rounded-lg bg-zinc-50/10 ${className}`} {...props}></div>;
}
