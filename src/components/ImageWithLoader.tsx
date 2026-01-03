import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const ImageWithLoader = ({ src, alt, className, containerClassName }: ImageWithLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Skeleton loader - transparent for hero sections */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-foreground/5 animate-pulse" />
      )}
      
      {/* Actual image */}
      <motion.img
        src={src}
        alt={alt}
        className={cn(className, "transition-opacity duration-500")}
        style={{ opacity: isLoaded ? undefined : 0 }}
        onLoad={() => setIsLoaded(true)}
        initial={{ scale: 1.05 }}
        animate={{ scale: isLoaded ? 1 : 1.05 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
    </div>
  );
};

export default ImageWithLoader;
