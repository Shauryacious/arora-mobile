import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  href?: string;
}) => {
  const content = (
    <motion.p
      transition={{ duration: 0.3 }}
      className="cursor-pointer text-white hover:opacity-[0.9]"
    >
      {item}
    </motion.p>
  );

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      {href ? (
        <Link to={href} onClick={() => setActive(null)}>
          {content}
        </Link>
      ) : (
        content
      )}
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && children && (
            <div className="absolute top-[calc(100%_+_1.7rem)] left-1/2 transform -translate-x-1/2">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border-none shadow-none dark:border-white/[0.9] bg-[rgba(0,0,0,0.8)] flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src?: string;
}) => {
  return (
    <Link to={href} className="flex space-x-2">
      {src && (
        <img
          src={src}
          width={140}
          height={70}
          alt={title}
          className="flex-shrink-0 rounded-md shadow-2xl"
        />
      )}
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ 
  children, 
  to,
  className,
  ...rest 
}: { 
  children: React.ReactNode;
  to: string;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <Link
      to={to}
      className={cn("text-neutral-700 dark:text-neutral-200 hover:text-black", className)}
      {...rest}
    >
      {children}
    </Link>
  );
};

