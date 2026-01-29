import { Fragment, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { routeMeta } from "@/lib/routes";

type BreadcrumbTone = "light" | "dark";

interface BreadcrumbsProps {
  tone?: BreadcrumbTone;
  className?: string;
  listClassName?: string;
  linkClassName?: string;
  pageClassName?: string;
  separatorClassName?: string;
  hideOnHome?: boolean;
}

const formatSegment = (segment: string) =>
  segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const Breadcrumbs = ({
  tone = "light",
  className,
  listClassName,
  linkClassName,
  pageClassName,
  separatorClassName,
  hideOnHome = false,
}: BreadcrumbsProps) => {
  const location = useLocation();

  const normalizedPath = useMemo(
    () => location.pathname.replace(/\/+$/, "") || "/",
    [location.pathname],
  );

  const breadcrumbs = useMemo(() => {
    if (hideOnHome && normalizedPath === "/") {
      return [];
    }
    const segments = normalizedPath.split("/").filter(Boolean);
    const crumbs: { label: string; href: string }[] = [{ label: "Home", href: "/" }];

    let currentPath = "";
    segments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = routeMeta[currentPath]?.label ?? formatSegment(segment);
      crumbs.push({ label, href: currentPath });
    });

    return crumbs;
  }, [hideOnHome, normalizedPath]);

  useEffect(() => {
    const scriptId = "breadcrumb-schema";
    if (breadcrumbs.length === 0) {
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
      }
      return;
    }
    const origin = window.location.origin;
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.label,
        item: new URL(crumb.href, origin).toString(),
      })),
    };

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(schema);
  }, [breadcrumbs]);

  const toneStyles =
    tone === "dark"
      ? {
          list: "text-primary-foreground/70",
          link: "text-primary-foreground/80 hover:text-primary-foreground",
          page: "text-primary-foreground",
          separator: "text-primary-foreground/50",
        }
      : {
          list: "text-muted-foreground",
          link: "text-foreground/80 hover:text-foreground",
          page: "text-foreground",
          separator: "text-muted-foreground/60",
        };

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Breadcrumb className={className}>
        <BreadcrumbList className={cn(toneStyles.list, listClassName)}>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <Fragment key={`${crumb.href}-${crumb.label}`}>
                {index > 0 && (
                  <BreadcrumbSeparator className={cn(toneStyles.separator, separatorClassName)} />
                )}
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className={cn(toneStyles.page, pageClassName)}>
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink className={cn(toneStyles.link, linkClassName)} href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  );
};

export default Breadcrumbs;
